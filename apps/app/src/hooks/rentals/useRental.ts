import type { Rental } from "@/data/local/schema";

import { useCallback, useEffect, useState } from "react";
import { useData } from "../useData";
import { transformRental } from "@/utils/transforms";

interface UseRentalOptions {
    /**
     * Whether to skip the initial fetch from storage
     */
    skipStorageLoad?: boolean;
}

export function useRental(id: number, options: UseRentalOptions = {}) {
    const { api, storage } = useData();

    const [rental, setRental] = useState<Rental | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Loads the rental from storage
     */
    const loadFromStorage = useCallback(async () => {
        try {
            const stored = await storage!.rentals.get(id);
            if (stored) {
                setRental(stored);
            }
        } catch (err) {
            console.error("Failed to load rental from storage:", err);
        }
    }, [id, storage]);

    /**
     * Updates the rental in storage
     */
    const updateStorage = useCallback(async (rental: Rental) => {
        try {
            await storage!.cars.upsert(rental.car);
            await storage!.rentals.upsert(rental);
        } catch (err) {
            console.error("Failed to update rental in storage:", err);
        }
    }, [id, storage]);

    /**
     * Fetches the rental from the API and updates storage if successful
     */
    const fetchFromAPI = useCallback(async () => {
        if (!api) {
            return;
        }

        setError("");
        setIsLoading(true); // TODO: Deal with the fact that isLoading will be ture if there is no network.

        try {
            const rental = await api.rentals.getRental(id);
            if (rental.car && rental.car.model === undefined) {
                rental.car = await api.cars.getCar(rental.car.id);
            }

            if (!rental.car) {
                return setError("Failed to fetch car details.");
            }

            const transformed = transformRental(rental);

            setRental(transformed);
            await updateStorage(transformed);
        } catch {
            setError("Failed to fetch rental details.");
        } finally {
            setIsLoading(false);
        }
    }, [api, id, updateStorage]);

    /**
     * Initialize the rental data
     */
    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);

            if (!options.skipStorageLoad) {
                await loadFromStorage();
            }

            await fetchFromAPI();
        };

        initialize();
    }, [loadFromStorage, fetchFromAPI, options.skipStorageLoad]);

    return {
        rental,
        isLoading,
        error,
        refresh: fetchFromAPI
    };
}
