import type { APIPatchRentalBody } from "@/types/api";
import type { Rental } from "@/data/local/schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { transformRental } from "@/utils/transforms";
import { useData } from "@/hooks/useData";

interface EditRentalOptions {
    id: number;
    options: APIPatchRentalBody;
}

export function useEditRental() {
    const queryClient = useQueryClient();
    const { api, storage } = useData();

    const mutation = useMutation({
        mutationKey: QueryKeys.RENTALS,
        mutationFn: async ({ id, options }: EditRentalOptions) => {
            if (!api || !storage) {
                throw new Error("The app is not ready yet.");
            }

            const rental = await api.rentals.editRental(id, options);
            const transformed = transformRental(rental);

            await storage.rentals.upsert(transformed);

            return transformed;
        },
        onSuccess: (rental) => {
            queryClient.setQueryData<Rental[]>(QueryKeys.RENTALS, (prev) => prev?.map((item) => {
                return item.id === rental.id ? rental : item;
            }));

            queryClient.setQueryData(QueryKeys.RENTAL(rental.id), rental);
        }
    });

    return {
        editRental: (id: number, options: APIPatchRentalBody) => {
            return mutation.mutate({ id, options });
        },
        editRentalAsync: async (id: number, options: APIPatchRentalBody) => {
            return mutation.mutateAsync({ id, options });
        },
        isPending: mutation.isPending,
        error: mutation.error
    }
}
