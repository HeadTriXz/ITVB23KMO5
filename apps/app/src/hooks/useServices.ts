import { NotificationService } from "@/services/notifications";
import { RentalStateService } from "@/services/rentalState";
import { useCreateNotification } from "@/hooks/notifications/useCreateNotification";
import { useData } from "@/hooks/useData";
import { useEditRental } from "@/hooks/rentals/useEditRental";
import { useEffect } from "react";

export function useServices() {
    const { createNotificationAsync } = useCreateNotification();
    const { editRentalAsync } = useEditRental();
    const { storage } = useData();

    useEffect(() => {
        if (!storage) {
            return;
        }

        const rentals = new RentalStateService(storage, editRentalAsync);
        rentals.registerTask()
            .then(() => rentals.checkRentals())
            .catch(console.error);

        const notifications = new NotificationService(storage, createNotificationAsync);
        notifications.initialize()
            .then(() => notifications.checkRentals())
            .catch(console.error);

        return () => {
            notifications.destroy().catch(console.error);
        };
    }, [createNotificationAsync, editRentalAsync, storage]);
}
