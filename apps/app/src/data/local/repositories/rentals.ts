import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import * as schema from "@/data/local/schema";

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

    async bulkOverwrite(rentals: schema.Rental[]): Promise<void> {
        await this.#db.transaction(async (tx) => {
            await tx.delete(schema.rentals);
            await tx.insert(schema.rentals).values(rentals);
        });
    }

    async delete(id: number): Promise<void> {
        await this.#db.delete(schema.rentals)
            .where(eq(schema.rentals.id, id));
    }

    async get(id: number): Promise<schema.Rental | undefined> {
        return this.#db.query.rentals.findFirst({
            where: eq(schema.rentals.id, id),
            with: {
                car: true
            }
        });
    }

    async getAll(): Promise<schema.Rental[]> {
        return this.#db.query.rentals.findMany({
            with: {
                car: true
            }
        });
    }

    async upsert(rental: schema.RentalInsert): Promise<void> {
        await this.#db.insert(schema.rentals)
            .values(rental)
            .onConflictDoUpdate({
                target: schema.rentals.id,
                set: rental
            });
    }
}
