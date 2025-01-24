import type { Notification, NotificationInsert } from "@/data/local/schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";
import { useData } from "@/hooks/useData";

export function useCreateNotification() {
    const queryClient = useQueryClient();
    const { storage } = useData();

    const mutation = useMutation({
        mutationKey: QueryKeys.NOTIFICATIONS,
        mutationFn: async (options: NotificationInsert) => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            const [notification] = await storage.notifications.create(options);
            return notification;
        },
        onSuccess: (notification) => {
            queryClient.setQueryData<Notification[]>(QueryKeys.NOTIFICATIONS, (prev) => {
                return prev ? [...prev, notification] : [notification];
            });

            queryClient.setQueryData<number>(QueryKeys.NOTIFICATIONS_COUNT, (prev) => {
                return prev ? prev + 1 : 1;
            });
        }
    });

    return {
        createNotification: mutation.mutate,
        createNotificationAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error
    };
}
