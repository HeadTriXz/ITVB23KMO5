import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";

export function useNotifications() {
    const { storage } = useData();

    const { data: notifications, isLoading, error, refetch } = useQuery({
        queryKey: QueryKeys.NOTIFICATIONS,
        queryFn: async () => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            return storage.notifications.getAll();
        }
    });

    return {
        notifications,
        isLoading,
        error,
        refresh: refetch
    };
}
