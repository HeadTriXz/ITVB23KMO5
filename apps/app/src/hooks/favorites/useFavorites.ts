import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";

export function useFavorites() {
    const { storage } = useData();

    const { data: favorites, isLoading, error, refetch } = useQuery({
        queryKey: QueryKeys.FAVORITES,
        queryFn: async () => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            return storage.favorites.getAll();
        }
    });

    return {
        favorites,
        isLoading,
        error,
        refresh: refetch
    };
}
