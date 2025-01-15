import type { Rental } from "@/data/local/schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

export function useDeleteRental() {
    const queryClient = useQueryClient();
    const { api, storage } = useData();

    const mutation = useMutation({
        mutationKey: QueryKeys.RENTALS,
        mutationFn: async (id: number) => {
            if (!api || !storage) {
                throw new Error("The app is not ready yet.");
            }

            await api.rentals.deleteRental(id);

            await storage.rentals.delete(id);
            await storage.cars.deleteOrphans();

            return id;
        },
        onSuccess: (id) => {
            queryClient.setQueryData<Rental[]>(QueryKeys.RENTALS, (prev) => prev?.filter((item) => {
                return item.id !== id;
            }));

            queryClient.removeQueries({
                exact: true,
                queryKey: QueryKeys.RENTAL(id)
            });
        }
    });

    return {
        deleteRental: mutation.mutate,
        deleteRentalAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}
