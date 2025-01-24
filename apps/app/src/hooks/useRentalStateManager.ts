import type { APIPatchRentalBody } from "@/types/api";

import { useEffect, useRef } from "react";

import { API } from "@/data/remote/api";
import { LocalStorage } from "@/data/local/storage";
import { RESTClient } from "@/data/remote/client";
import { db } from "@/data/local/database";
import { useData } from "@/hooks/useData";
import { useEditRental } from "@/hooks/rentals/useEditRental";

import * as BackgroundFetch from "expo-background-fetch";
import * as SecureStorage from "expo-secure-store";
import * as TaskManager from "expo-task-manager";

/**
 * The options for checking rentals.
 */
interface CheckRentalsOptions {
    /**
     * Edits a rental.
     */
    editRental: (id: number, options: APIPatchRentalBody) => Promise<void>;

    /**
     * The local storage of the app.
     */
    storage: LocalStorage;
}

/**
 * The name of the background task.
 */
const RENTAL_STATE_TASK = "rental-state";

/**
 * The interval for the background task (in seconds).
 */
const BACKGROUND_TASK_INTERVAL = 15 * 60;

/**
 * The prefixes for background log messages.
 */
const BG_PREFIX = "[RENTAL/BG]";

/**
 * The prefixes for check log messages.
 */
const CH_PREFIX = "[RENTAL/CHECK]";

/**
 * The prefixes for foreground log messages.
 */
const FG_PREFIX = "[RENTAL/FG]";

/**
 * The interval for the foreground task (in seconds).
 */
const FOREGROUND_TASK_INTERVAL = 60;

TaskManager.defineTask(RENTAL_STATE_TASK, async () => {
    try {
        console.log(`${BG_PREFIX} Running background task...`);

        const token = await SecureStorage.getItemAsync("token");
        if (!token) {
            console.log(`${BG_PREFIX} No token found.`);
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }

        const rest = new RESTClient(process.env.EXPO_PUBLIC_API_URL);
        const api = new API(rest);
        rest.setToken(token);

        const storage = new LocalStorage(db);

        await checkRentals({
            editRental: async (id, options) => {
                await api.rentals.editRental(id, options);
            },
            storage: storage
        });

        console.log(`${BG_PREFIX} Background task completed.`);
        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        console.log(`${BG_PREFIX} Background task failed:`, error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

/**
 * Checks the rentals and updates them if necessary.
 *
 * @param options The options for checking rentals.
 */
async function checkRentals({ editRental, storage }: CheckRentalsOptions) {
    console.log(`${CH_PREFIX} Checking rentals...`);

    const rentals = await storage.rentals.updatePending();
    for (const { id } of rentals) {
        await editRental(id, { state: "ACTIVE" });
    }

    console.log(`${CH_PREFIX} Updated ${rentals.length} rentals.`);
}

/**
 * Registers the background task.
 */
async function registerBackgroundTask() {
    try {
        console.log(`${BG_PREFIX} Registering background task...`);
        await BackgroundFetch.registerTaskAsync(RENTAL_STATE_TASK, {
            minimumInterval: BACKGROUND_TASK_INTERVAL,
            stopOnTerminate: false,
            startOnBoot: true
        });
    } catch (error) {
        console.error(`${BG_PREFIX} Failed to register background task:`, error);
    }
}

/**
 * A hook for managing the rental state.
 */
export function useRentalStateManager() {
    const { editRentalAsync } = useEditRental();
    const { storage } = useData();

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const runRentalCheck = async () => checkRentals({
        editRental: async (id, options) => {
            await editRentalAsync(id, options);
        },
        storage: storage!
    });

    useEffect(() => {
        if (!storage) {
            return;
        }

        const initialize = async () => {
            try {
                console.log(`${FG_PREFIX} Initializing rental state manager...`);

                timerRef.current = setInterval(
                    runRentalCheck,
                    FOREGROUND_TASK_INTERVAL * 1000
                );

                await registerBackgroundTask();
                await runRentalCheck();
            } catch (error) {
                console.error(`${FG_PREFIX} Failed to initialize rental state manager:`, error);
            }
        }

        initialize();

        return () => {
            console.log(`${FG_PREFIX} Cleaning up rental state manager...`);

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
