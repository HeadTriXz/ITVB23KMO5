import { type ExpoSQLiteDatabase, useLiveQuery } from "drizzle-orm/expo-sqlite";

import { eq } from "drizzle-orm";
import * as schema from "@/data/local/schema";

/**
 * The repository for the favorite cars table.
 */
export class FavoritesRepository {
    /**
     * The database to use.
     * @private
     */
    readonly #db: ExpoSQLiteDatabase<typeof schema>;

    /**
     * The repository for the favorite cars table.
     *
     * @param db The database to use.
     */
    constructor(db: ExpoSQLiteDatabase<typeof schema>) {
        this.#db = db;
    }

    /**
     * Adds a car to the favorites.
     *
     * @param carId The ID of the car.
     */
    async addFavorite(carId: number): Promise<void> {
        await this.#db
            .insert(schema.favorites)
            .values({ carId });
    }

    /**
     * Clears the favorite cars.
     */
    async clear(): Promise<void> {
        await this.#db.delete(schema.favorites);
    }

    /**
     * Gets a list of favorite cars.
     *
     * @returns A list of favorite cars.
     */
    async getFavorites(): Promise<number[]> {
        const result = await this.#db.query.favorites.findMany();

        return result.map((row) => row.carId);
    }

    /**
     * Gets a list of favorite cars.
     * It will update the list when the data changes.
     *
     * @returns A list of favorite cars.
     */
    getLiveFavorites(): schema.Favorite[] {
        const { data } = useLiveQuery(this.#db.query.favorites.findMany());
        return data;
    }

    /**
     * Checks if a car is marked as favorite.
     *
     * @param carId The ID of the car.
     */
    async isFavorite(carId: number): Promise<boolean> {
        const result = await this.#db.query.favorites.findFirst({
            where: eq(schema.favorites.carId, carId)
        });

        return result !== undefined;
    }

    /**
     * Removes a car from the favorites.
     *
     * @param carId The ID of the car.
     */
    async removeFavorite(carId: number): Promise<void> {
        await this.#db
            .delete(schema.favorites)
            .where(eq(schema.favorites.carId, carId));
    }
}
