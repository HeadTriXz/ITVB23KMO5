import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";

interface UseCarOptions {
    enabled?: boolean;
}

export function useCar(id: number, { enabled = true }: UseCarOptions = {}) {
    const { api } = useData();

    const { data: car, isLoading, error, refetch } = useQuery({
        enabled: enabled,
        queryKey: QueryKeys.CAR(id),
        queryFn: async () => {
            if (!api) {
                throw new Error("The app is not ready yet.");
            }

            return api.cars.getCar(id);
        }
    });

    return {
        car,
        isLoading,
        error,
        refresh: refetch
    };
}
