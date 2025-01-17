import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { transformRental } from "@/utils/transforms";
import { useData } from "@/hooks/useData";

interface UseRentalsOptions {
    /**
     * Whether to skip the initial fetch from storage
     */
    skipStorageLoad?: boolean;
}

export function useRentals(options: UseRentalsOptions = {}) {
    const queryClient = useQueryClient();
    const { api, storage } = useData();

    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    useEffect(() => {
        if (options.skipStorageLoad || !storage) {
            return;
        }

        storage.rentals.getAll()
            .then((stored) => {
                if (stored.length > 0) {
                    queryClient.setQueryData(QueryKeys.RENTALS, stored);
                }
            })
            .catch((err) => {
                console.error("Failed to load rentals from storage:", err);
            })
            .finally(() => setIsLoadingStorage(false));
    }, [options.skipStorageLoad, storage, queryClient]);

    const { data: rentals, isLoading, error, refetch } = useQuery({
        enabled: !isLoadingStorage || options.skipStorageLoad,
        queryKey: QueryKeys.RENTALS,
        queryFn: async () => {
            if (!api || !storage) {
                throw new Error("The app is not ready yet.");
            }

            const customer = await api.customers.getCustomer();
            const rentals = await api.rentals.getRentals({
                "customerId.equals": customer.id,
                "sort": ["toDate,desc"]
            });

            const cars = await Promise.all(
                rentals.map(async (rental) => {
                    if (!rental.car || rental.car.model !== undefined) {
                        return rental.car;
                    }

                    return api.cars.getCar(rental.car.id);
                })
            );

            const transformed = rentals.map((rental, index) => {
                return transformRental({ ...rental, car: cars[index] });
            });

            if (transformed.length > 0) {
                await storage.cars.upsertMany(transformed.map((rental) => rental.car));
            }

            await storage.rentals.bulkOverwrite(transformed);
            await storage.cars.deleteOrphans();

            return transformed;
        }
    });

    return {
        rentals,
        isLoading,
        error,
        refresh: refetch
    };
}
