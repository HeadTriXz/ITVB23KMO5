import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import type * as schema from "@/data/local/schema";

/**
 * The repository for the rentals table.
 */
export class RentalsRepository {
    /**
     * The database to use.
     * @private
     */
    readonly #db: ExpoSQLiteDatabase<typeof schema>;

    /**
     * The repository for the rentals table.
     *
     * @param db The database to use.
     */
    constructor(db: ExpoSQLiteDatabase<typeof schema>) {
        this.#db = db;
    }
}
