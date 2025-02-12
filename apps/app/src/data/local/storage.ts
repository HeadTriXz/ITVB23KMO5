import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import type * as schema from "@/data/local/schema";

import {
    CarsRepository,
    FavoritesRepository,
    NotificationsRepository,
    RentalsRepository
} from "@/data/local/repositories";

/**
 * The local storage of the application.
 */
export class LocalStorage {
    /**
     * The repository for cars.
     */
    readonly cars: CarsRepository;

    /**
     * The repository for favorite cars.
     */
    readonly favorites: FavoritesRepository;

    /**
     * The repository for notifications.
     */
    readonly notifications: NotificationsRepository;

    /**
     * The repository for rentals.
     */
    readonly rentals: RentalsRepository;

    /**
     * The local storage of the application.
     *
     * @param db The database to use.
     */
    constructor(db: ExpoSQLiteDatabase<typeof schema>) {
        this.cars = new CarsRepository(db);
        this.favorites = new FavoritesRepository(db);
        this.notifications = new NotificationsRepository(db);
        this.rentals = new RentalsRepository(db);
    }

    /**
     * Clears all data from the storage.
     */
    async clear() {
        await this.cars.clear();
        await this.favorites.clear();
        await this.notifications.clear();
        await this.rentals.clear();
    }
}
