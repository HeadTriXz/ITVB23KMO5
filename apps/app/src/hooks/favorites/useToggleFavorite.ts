import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

export function useToggleFavorite() {
    const queryClient = useQueryClient();
    const { storage } = useData();

    const mutation = useMutation({
        mutationFn: async (carId: number) => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            const isFavorite = await storage.favorites.isFavorite(carId);
            if (isFavorite) {
                await storage.favorites.delete(carId);
            } else {
                await storage.favorites.create(carId);
            }

            return !isFavorite;
        },
        onSuccess: (isFavorite, carId) => {
            queryClient.setQueryData<number[]>(QueryKeys.FAVORITES, (prev) => {
                if (prev) {
                    return isFavorite ? [...prev, carId] : prev.filter((id) => id !== carId);
                }

                return isFavorite ? [carId] : [];
            });

            queryClient.setQueryData(QueryKeys.FAVORITE(carId), isFavorite);
        }
    });

    return {
        toggleFavorite: mutation.mutate,
        toggleFavoriteAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    }
}
