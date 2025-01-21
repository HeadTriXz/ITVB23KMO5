import type { APIPatchRentalBody } from "@/types/api";
import type { LocalStorage } from "@/data/local/storage";
import type { Rental } from "@/data/local/schema";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

/**
 * Edits a rental.
 */
type EditRentalFunction = (id: number, options: APIPatchRentalBody) => Promise<Rental>;

/**
 * A service for managing the state of rentals.
 */
export class RentalStateService {
    /**
     * The function for editing a rental.
     * @private
     */
    readonly #editRental: EditRentalFunction;

    /**
     * The local storage of the app.
     * @private
     */
    readonly #storage: LocalStorage;

    /**
     * A service for managing the state of rentals.
     *
     * @param storage The local storage of the app.
     * @param editRental The function for editing a rental.
     */
    constructor(storage: LocalStorage, editRental: EditRentalFunction) {
        this.#editRental = editRental
        this.#storage = storage;
    }

    /**
     * Checks all rentals and updates their state.
     */
    async checkRentals(): Promise<void> {
        const rentals = await this.#storage.rentals.updatePending();
        if (rentals.length === 0) {
            return;
        }

        for (const { id } of rentals) {
            await this.#editRental(id, { state: "ACTIVE" });
        }
    }

    /**
     * Registers the rental state task.
     */
    async registerTask(): Promise<void> {
        if (TaskManager.isTaskDefined("rentalState")) {
            return;
        }

        TaskManager.defineTask("rentalState", async () => {
            return this.checkRentals()
                .then(() => BackgroundFetch.BackgroundFetchResult.NewData)
                .catch(() => BackgroundFetch.BackgroundFetchResult.Failed);
        });

        try {
            await BackgroundFetch.registerTaskAsync("rentalState", {
                minimumInterval: 60 * 15,
                stopOnTerminate: false,
                startOnBoot: true
            });
        } catch (err) {
            console.error("Failed to register the rentalState task:", err);
        }
    }
}
