import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";

export function useFavorite(id: number) {
    const { storage } = useData();

    const { data: isFavorite, isLoading, error, refetch } = useQuery({
        queryKey: QueryKeys.FAVORITE(id),
        queryFn: async () => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            return storage.favorites.isFavorite(id);
        }
    });

    return {
        isFavorite,
        isLoading,
        error,
        refresh: refetch
    };
}
