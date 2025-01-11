import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import type * as schema from "@/data/local/schema";

import {
    CarsRepository,
    FavoritesRepository,
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
        this.rentals = new RentalsRepository(db);
    }
}
