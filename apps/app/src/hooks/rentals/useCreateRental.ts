import type { APIPostRentalBody } from "@/types/api";
import type { Rental } from "@/data/local/schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { transformRental } from "@/utils/transforms";
import { useData } from "@/hooks/useData";

export function useCreateRental() {
    const queryClient = useQueryClient();
    const { api, storage } = useData();

    const mutation = useMutation({
        mutationKey: QueryKeys.RENTALS,
        mutationFn: async (options: APIPostRentalBody) => {
            if (!api || !storage) {
                throw new Error("The app is not ready yet.");
            }

            const rental = await api.rentals.createRental(options);
            if (!rental.car?.model) {
                rental.car = await api.cars.getCar(options.car.id);
            }

            const transformed = transformRental(rental);

            await storage.rentals.upsert(transformed);
            await storage.cars.upsert(transformed.car);

            return transformed;
        },
        onSuccess: (rental) => {
            queryClient.setQueryData<Rental[]>(QueryKeys.RENTALS, (prev) => {
                return prev ? [...prev, rental] : [rental];
            });

            queryClient.setQueryData(QueryKeys.RENTAL(rental.id), rental);
        }
    });

    return {
        createRental: mutation.mutate,
        createRentalAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}
