import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { notInArray, sql } from "drizzle-orm";
import * as schema from "@/data/local/schema";

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

    async deleteOrphans(): Promise<void> {
        const used = this.#db.select({ id: schema.rentals.carId })
            .from(schema.rentals)
            .union(
                this.#db.select({ id: schema.favorites.carId })
                    .from(schema.favorites)
            )

        await this.#db.delete(schema.cars)
            .where(notInArray(schema.cars.id, used));
    }

    async upsert(car: schema.CarInsert): Promise<void> {
        await this.#db.insert(schema.cars)
            .values(car)
            .onConflictDoUpdate({
                target: schema.cars.id,
                set: car
            });
    }

    async upsertMany(cars: schema.CarInsert[]): Promise<void> {
        await this.#db.insert(schema.cars)
            .values(cars)
            .onConflictDoUpdate({
                target: schema.cars.id,
                set: {
                    brand: sql`excluded.brand`,
                    fuel: sql`excluded.fuel`,
                    latitude: sql`excluded.latitude`,
                    licensePlate: sql`excluded.license_plate`,
                    longitude: sql`excluded.longitude`,
                    model: sql`excluded.model`,
                    modelYear: sql`excluded.model_year`,
                    nrOfSeats: sql`excluded.nr_of_seats`,
                    picture: sql`excluded.picture`,
                    price: sql`excluded.price`
                }
            });
    }
}
