import type { Notification, NotificationInsert } from "@/data/local/schema";
import { type PickPartial, useRouter } from "expo-router";

import { isPast, isToday, isTomorrow } from "@/utils/dates";
import { useEffect, useRef } from "react";

import { LocalStorage } from "@/data/local/storage";
import { PermissionStatus } from "expo-notifications";
import { db } from "@/data/local/database";
import { useCreateNotification } from "@/hooks/notifications/useCreateNotification";
import { useData } from "@/hooks/useData";
import { useMarkNotificationAsRead } from "@/hooks/notifications/useMarkNotificationAsRead";

import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

/**
 * The options for checking rentals.
 */
interface CheckRentalsOptions {
    /**
     * Creates a notification.
     */
    createNotification: (options: NotificationInsert) => Promise<Notification>;

    /**
     * The local storage of the app.
     */
    storage: LocalStorage;
}

/**
 * The options for scheduling a notification.
 */
type ScheduleNotificationOptions = PickPartial<NotificationInsert, "rentalId">;

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
 * The name of the notification task.
 */
const NOTIFICATION_TASK = "notifications";

/**
 * The interval for the background task (in seconds).
 */
const BACKGROUND_TASK_INTERVAL = 15 * 60;

/**
 * The prefixes for background log messages.
 */
const BG_PREFIX = "[NOTIF/BG]";

/**
 * The prefixes for check log messages.
 */
const CH_PREFIX = "[NOTIF/CHECK]";

/**
 * The prefixes for foreground log messages.
 */
const FG_PREFIX = "[NOTIF/FG]";

/**
 * The interval for the foreground task (in seconds).
 */
const FOREGROUND_TASK_INTERVAL = 60;

TaskManager.defineTask(NOTIFICATION_TASK, async () => {
    try {
        console.log(`${BG_PREFIX} Running background task...`);
        const storage = new LocalStorage(db);

        await checkRentals({
            createNotification: async (options) => {
                const [notification] = await storage.notifications.create(options);
                return notification;
            },
            storage: storage
        });

        console.log(`${BG_PREFIX} Background task completed.`);
        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        console.error(`${BG_PREFIX} Background task failed:`, error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

/**
 * Checks all rentals and sends notifications.
 *
 * @param options The options for checking rentals.
 */
async function checkRentals({ createNotification, storage }: CheckRentalsOptions) {
    console.log(`${CH_PREFIX} Checking rentals...`);

    const rentals = await storage.rentals.getActive();
    console.log(`${CH_PREFIX} Found ${rentals.length} active rentals.`);

    for (const rental of rentals) {
        const fromDate = new Date(rental.fromDate);
        const toDate = new Date(rental.toDate);

        console.log(`${CH_PREFIX} Checking rental ${rental.id} (${rental.fromDate} -> ${rental.toDate})`);

        const existing = await storage.notifications.getByRentalId(rental.id);
        const existingTypes = new Set(existing.map((n) => n.type));

        const scheduleNotification = async (options: ScheduleNotificationOptions) => {
            console.log(`${CH_PREFIX} Scheduling notification for rental ${rental.id}:`, options.type);
            const notification = await createNotification({ ...options, rentalId: rental.id });

            const triggerAt = new Date();
            triggerAt.setHours(9, 0, 0, 0);

            await Notifications.scheduleNotificationAsync({
                identifier: notification.id.toString(),
                content: {
                    title: notification.title,
                    body: notification.body,
                    data: { rentalId: rental.id }
                },
                trigger: Date.now() < triggerAt.getTime()
                    ? triggerAt
                    : null
            });

            console.log(`${CH_PREFIX} Notification ${notification.id} will trigger: ${Date.now() < triggerAt.getTime() ? triggerAt.toISOString() : "immediately"}`);
        }

        if (isTomorrow(fromDate) && !existingTypes.has(RentalNotificationType.Tomorrow)) {
            await scheduleNotification({
                title: "Your rental starts tomorrow",
                body: `Your rental of ${rental.car.brand} ${rental.car.model} starts tomorrow.`,
                type: RentalNotificationType.Tomorrow
            });
        }

        if (isToday(fromDate) && !existingTypes.has(RentalNotificationType.Started)) {
            await scheduleNotification({
                title: "Your rental starts today",
                body: `Your rental of ${rental.car.brand} ${rental.car.model} starts today.`,
                type: RentalNotificationType.Started
            });
        }

        if (isToday(toDate) && !existingTypes.has(RentalNotificationType.Ending)) {
            await scheduleNotification({
                title: "Your rental ends today",
                body: `Your rental of ${rental.car.brand} ${rental.car.model} ends today. Please return the car before the end of the day.`,
                type: RentalNotificationType.Ending
            });
        }

        if (isPast(toDate) && !existingTypes.has(RentalNotificationType.Overdue)) {
            await scheduleNotification({
                title: "Your rental has ended",
                body: `Your rental of ${rental.car.brand} ${rental.car.model} has ended. Please return the car as soon as possible.`,
                type: RentalNotificationType.Overdue
            });
        }
    }

    console.log(`${CH_PREFIX} Rental check completed.`);
}

/**
 * Registers the background task.
 */
async function registerBackgroundTask() {
    try {
        console.log(`${BG_PREFIX} Registering background task...`);
        await BackgroundFetch.registerTaskAsync(NOTIFICATION_TASK, {
            minimumInterval: BACKGROUND_TASK_INTERVAL,
            stopOnTerminate: false,
            startOnBoot: true
        });
    } catch (error) {
        console.error(`${BG_PREFIX} Failed to register background task:`, error);
    }
}

/**
 * A hook for scheduling notifications.
 */
export function useNotificationScheduler() {
    const { createNotificationAsync } = useCreateNotification();
    const { markAsReadAsync } = useMarkNotificationAsRead();
    const { storage } = useData();

    const router = useRouter();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const subscriptionRef = useRef<Notifications.EventSubscription | null>(null);

    const runRentalCheck = async () => checkRentals({
        createNotification: createNotificationAsync,
        storage: storage!
    });

    useEffect(() => {
        if (!storage) {
            return;
        }

        const initialize = async () => {
            try {
                console.log(`${FG_PREFIX} Initializing notification scheduler...`);

                const { status } = await Notifications.requestPermissionsAsync();
                if (status !== PermissionStatus.GRANTED) {
                    console.warn(`${FG_PREFIX} Notifications permission not granted.`);
                    return;
                }

                subscriptionRef.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
                    const id = Number(response.notification.request.identifier);
                    console.log(`${FG_PREFIX} Notification response received:`, id);

                    await markAsReadAsync(id);

                    const rentalId = response.notification.request.content.data.rentalId as string | undefined;
                    if (rentalId) {
                        router.push(`/trips/${rentalId}`);
                    }
                });

                timerRef.current = setInterval(
                    runRentalCheck,
                    FOREGROUND_TASK_INTERVAL * 1000
                );

                await registerBackgroundTask();
                await runRentalCheck();
            } catch (error) {
                console.error(`${FG_PREFIX} Failed to initialize notification scheduler:`, error);
            }
        }

        initialize();

        return () => {
            console.log(`${FG_PREFIX} Cleaning up notification scheduler...`);

            if (subscriptionRef.current) {
                subscriptionRef.current.remove();
            }

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [storage]);

    return {
        checkRentals: async () => {
            if (!storage) {
                throw new Error("The app is not ready yet.");
            }

            console.log(`${FG_PREFIX} Manually checking rentals...`);
            await runRentalCheck();
        }
    }
}
