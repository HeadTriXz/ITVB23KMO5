import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";
import { useQuery } from "@tanstack/react-query";

export function useUnreadNotificationsCount() {
    const { storage } = useData();

    const { data: count, isLoading, error, refetch } = useQuery({
        queryKey: QueryKeys.NOTIFICATIONS_COUNT,
        queryFn: async () => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            return storage.notifications.countUnread();
        }
    });

    return {
        count,
        isLoading,
        error,
        refresh: refetch
    };
}
