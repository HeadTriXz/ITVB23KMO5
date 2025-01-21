import type { LocalStorage } from "@/data/local/storage";

import { isPast, isToday, isTomorrow } from "date-fns";

import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as schema from "@/data/local/schema";

/**
 * The types of rental notifications.
 */
enum RentalNotificationType {
    Tomorrow = "rental-tomorrow",
    Started = "rental-started",
    Ending = "rental-ending",
    Overdue = "rental-overdue"
}

/**
 * Creates a notification.
 */
type CreateNotificationFunction = (options: schema.NotificationInsert) => Promise<schema.Notification>;

/**
 * A service for scheduling notifications related to rentals.
 */
export class NotificationService {
    /**
     * The function for creating notifications.
     * @private
     */
    readonly #createNotification: CreateNotificationFunction;

    /**
     * The local storage of the app.
     * @private
     */
    readonly #storage: LocalStorage;

    /**
     * A service for scheduling notifications related to rentals.
     *
     * @param storage The local storage of the app.
     * @param createNotification The function for creating notifications.
     */
    constructor(storage: LocalStorage, createNotification: CreateNotificationFunction) {
        this.#createNotification = createNotification;
        this.#storage = storage;
    }

    /**
     * Checks all rentals and schedules notifications for them.
     */
    async checkRentals(): Promise<void> {
        const rentals = await this.#storage.rentals.getAll();
        for (const rental of rentals) {
            if (rental.state === "RETURNED" || rental.state === "PICKUP") {
                continue;
            }

            const fromDate = new Date(rental.fromDate);
            const toDate = new Date(rental.toDate);

            const existing = await this.#storage.notifications.getByRentalId(rental.id);
            const existingTypes = new Set(existing.map((n) => n.type));

            if (!existingTypes.has(RentalNotificationType.Tomorrow) && isTomorrow(fromDate)) {
                await this.scheduleNotification({
                    title: "Your rental starts tomorrow",
                    body: `Your rental of ${rental.car.brand} ${rental.car.model} starts tomorrow.`,
                    type: RentalNotificationType.Tomorrow,
                    rentalId: rental.id
                });
            }

            if (!existingTypes.has(RentalNotificationType.Started) && isToday(fromDate)) {
                await this.scheduleNotification({
                    title: "Your rental starts today",
                    body: `Your rental of ${rental.car.brand} ${rental.car.model} starts today.`,
                    type: RentalNotificationType.Started,
                    rentalId: rental.id
                });
            }

            if (!existingTypes.has(RentalNotificationType.Ending) && isToday(toDate)) {
                await this.scheduleNotification({
                    title: "Your rental ends today",
                    body: `Your rental of ${rental.car.brand} ${rental.car.model} ends today. Please return the car before the end of the day.`,
                    type: RentalNotificationType.Ending,
                    rentalId: rental.id
                });
            }

            if (!existingTypes.has(RentalNotificationType.Overdue) && isPast(toDate)) {
                await this.scheduleNotification({
                    title: "Your rental has ended",
                    body: `Your rental of ${rental.car.brand} ${rental.car.model} has ended. Please return the car as soon as possible.`,
                    type: RentalNotificationType.Overdue,
                    rentalId: rental.id
                });
            }
        }
    }

    /**
     * Destroys the notifications service.
     */
    async destroy(): Promise<void> {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    /**
     * Initializes the notifications service.
     */
    async initialize(): Promise<void> {
        Notifications.setNotificationHandler({
            handleNotification: async () => Promise.resolve({
                shouldPlaySound: true,
                shouldShowAlert: true,
                shouldSetBadge: true
            })
        });

        Notifications.addNotificationResponseReceivedListener(async (response) => {
            const id = parseInt(response.notification.request.identifier);
            await this.#storage.notifications.markAsRead(id);
        });

        await this.registerTask();
    }

    /**
     * Registers the notifications task.
     */
    async registerTask(): Promise<void> {
        if (TaskManager.isTaskDefined("notifications")) {
            return;
        }

        TaskManager.defineTask("notifications", async () => {
            return this.checkRentals()
                .then(() => BackgroundFetch.BackgroundFetchResult.NewData)
                .catch(() => BackgroundFetch.BackgroundFetchResult.Failed);
        });

        try {
            await BackgroundFetch.registerTaskAsync("notifications", {
                minimumInterval: 60 * 15,
                stopOnTerminate: false,
                startOnBoot: true
            });
        } catch (err) {
            console.error("Failed to register the notifications task:", err);
        }
    }

    /**
     * Sends a notification.
     *
     * @param options The notification to send.
     */
    async scheduleNotification(options: schema.NotificationInsert): Promise<void> {
        const notification = await this.#createNotification(options);

        const triggerAt = new Date();
        triggerAt.setHours(9, 0, 0, 0);

        await Notifications.scheduleNotificationAsync({
            identifier: notification.id.toString(),
            content: {
                title: notification.title,
                body: notification.body
            },
            trigger: triggerAt
        });
    }
}
