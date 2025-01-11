import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import type * as schema from "@/data/local/schema";

/**
 * The repository for the cars table.
 */
export class CarsRepository {
    /**
     * The database to use.
     * @private
     */
    readonly #db: ExpoSQLiteDatabase<typeof schema>;

    /**
     * The repository for the cars table.
     *
     * @param db The database to use.
     */
    constructor(db: ExpoSQLiteDatabase<typeof schema>) {
        this.#db = db;
    }
}
