import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryKeys } from "@/constants/queryKeys";
import { transformRental } from "@/utils/transforms";
import { useData } from "../useData";

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

            return api.rentals.getRental(id);
        }
    });

    const transformedRental = rental
        ? transformRental(rental)
        : undefined;

    useEffect(() => {
        if (!storage || !transformedRental) {
            return;
        }

        const storeData = async () => {
            await storage.cars.upsert(transformedRental.car);
            await storage.rentals.upsert(transformedRental);
        };

        storeData().catch(console.error);
    }, [storage, transformedRental?.id]);

    return {
        rental: transformedRental,
        isLoading: isLoading,
        error: error,
        refresh: refetch
    };
}
