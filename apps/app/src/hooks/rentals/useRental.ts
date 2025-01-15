import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "../useData";
import { transformRental } from "@/utils/transforms";

interface UseRentalOptions {
    /**
     * Whether to skip the initial fetch from storage
     */
    skipStorageLoad?: boolean;
}

export function useRental(id: number, options: UseRentalOptions = {}) {
    const queryClient = useQueryClient();
    const { api, storage } = useData();

    const [isLoadingStorage, setIsLoadingStorage] = useState(true);

    useEffect(() => {
        if (options.skipStorageLoad || !storage) {
            return;
        }

        storage.rentals.get(id)
            .then((stored) => {
                if (stored) {
                    queryClient.setQueryData(QueryKeys.RENTAL(id), stored);
                }
            })
            .catch((err) => {
                console.error("Failed to load rental from storage:", err);
            })
            .finally(() => setIsLoadingStorage(false));
    }, [options.skipStorageLoad, storage, queryClient]);

    const { data: rental, isLoading, error, refetch } = useQuery({
        enabled: !isLoadingStorage || options.skipStorageLoad,
        queryKey: QueryKeys.RENTAL(id),
        queryFn: async () => {
            if (!api || !storage) {
                throw new Error("The app is not ready yet.");
            }

            const rental = await api.rentals.getRental(id);
            if (rental.car && rental.car.model === undefined) {
                rental.car = await api.cars.getCar(rental.car.id);
            }

            const transformed = transformRental(rental);

            await storage.cars.upsert(transformed.car);
            await storage.rentals.upsert(transformed);

            return transformed;
        }
    });

    return {
        rental,
        isLoading,
        error,
        refresh: refetch
    };
}
