import type { Notification } from "@/data/local/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

export function useMarkNotificationAsRead() {
    const queryClient = useQueryClient();
    const { storage } = useData();

    const mutation = useMutation({
        mutationFn: async (id: number) => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            return storage.notifications.markAsRead(id);
        },
        onSuccess: (_, id) => {
            queryClient.setQueryData<Notification[]>(QueryKeys.NOTIFICATIONS, (prev) => prev?.map((notification) => {
                return notification.id === id ? { ...notification, isRead: true } : notification;
            }));

            queryClient.setQueryData<number>(QueryKeys.NOTIFICATIONS_COUNT, (prev) => {
                return prev ? prev - 1 : 0;
            });
        }
    });

    return {
        markAsRead: mutation.mutate,
        markAsReadAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    };
}
