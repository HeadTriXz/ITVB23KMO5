import type { Rental } from "@/data/local/schema";
import { useCallback, useEffect, useState } from "react";
import { transformRental } from "@/utils/transforms";
import { useData } from "@/hooks/useData";
import type { APIPatchRentalBody, APIPostRentalBody } from "@/types/api";

interface UseRentalsOptions {
    /**
     * Whether to skip the initial fetch from storage
     */
    skipStorageLoad?: boolean;
}

export function useRentals(options: UseRentalsOptions = {}) {
    const { api, storage } = useData();

    const [rentals, setRentals] = useState<Rental[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    /**
     * Loads the rentals from storage
     */
    const loadFromStorage = useCallback(async () => {
        try {
            const stored = await storage!.rentals.getAll();
            if (stored.length > 0) {
                setRentals(stored);
                setIsLoading(false);
            }
        } catch (err) {
            console.error("Failed to load rentals from storage:", err);
        }
    }, [storage]);

    /**
     * Updates the rentals in storage
     */
    const updateStorage = useCallback(async (rentals: Rental[]) => {
        if (!storage) {
            return;
        }

        try {
            const cars = rentals.map((rental) => rental.car);

            await storage.cars.upsertMany(cars);
            await storage.rentals.bulkOverwrite(rentals);
            await storage.cars.deleteOrphans();
        } catch (err) {
            console.error("Failed to update rentals in storage:", err);
        }
    }, [storage]);

    /**
     * Creates a rental and updates storage if successful.
     */
    const createRental = useCallback(async (data: APIPostRentalBody) => {
        if (!api || !storage) {
            return;
        }

        try {
            const created = await api.rentals.createRental(data);
            const transformed = transformRental(created);

            setRentals([...rentals, transformed]);

            await storage.rentals.upsert(transformed);
        } catch {
            throw new Error("Failed to create rental.");
        }
    }, [api, rentals, storage]);

    /**
     * Deletes a rental and updates storage if successful.
     */
    const deleteRental = useCallback(async (id: number) => {
        if (!api || !storage) {
            return;
        }

        try {
            await api.rentals.deleteRental(id);

            const newRentals = rentals.filter((rental) => rental.id !== id);
            setRentals(newRentals);

            await storage.rentals.delete(id);
            await storage.cars.deleteOrphans();
        } catch {
            throw new Error("Failed to delete rental.");
        }
    }, [api, rentals, storage]);

    /**
     * Edits a rental and updates storage if successful.
     */
    const editRental = useCallback(async (id: number, data: APIPatchRentalBody) => {
        if (!api || !storage) {
            return;
        }

        try {
            const updated = await api.rentals.editRental(id, data);
            const transformed = transformRental(updated);

            const newRentals = rentals.map((rental) => rental.id === id ? transformed : rental);
            setRentals(newRentals);

            await storage.rentals.upsert(transformed);
        } catch {
            throw new Error("Failed to edit rental.");
        }
    }, [api, rentals, storage]);

    /**
     * Fetches the rentals from the API and updates storage if successful
     */
    const fetchFromAPI = useCallback(async () => {
        if (!api) {
            return;
        }

        setError("");
        if (rentals.length === 0) {
            setIsLoading(true);
        }

        try {
            const customer = await api.customers.getCustomer();
            const rentals = await api.rentals.getRentals({
                "customerId.equals": customer.id,
                "sort": ["toDate,desc"]
            });

            for (const rental of rentals) {
                if (!rental.car || rental.car.model !== undefined) {
                    continue;
                }

                rental.car = await api.cars.getCar(rental.car.id);
            }

            const transformed = rentals.map(transformRental);

            setRentals(transformed);
            await updateStorage(transformed);
        } catch {
            setError("Failed to fetch rentals.");
        } finally {
            setIsLoading(false);
        }
    }, [api, updateStorage]);

    /**
     * Initialize the rental data
     */
    useEffect(() => {
        const initialize = async () => {
            if (!options.skipStorageLoad) {
                await loadFromStorage();
            }

            await fetchFromAPI();
        };

        initialize();
    }, [loadFromStorage, fetchFromAPI, options.skipStorageLoad]);

    return {
        rentals,
        isLoading,
        error,
        createRental,
        deleteRental,
        editRental,
        refresh: fetchFromAPI
    };
}
