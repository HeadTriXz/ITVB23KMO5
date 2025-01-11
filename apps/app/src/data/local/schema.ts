import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cars = sqliteTable("cars", {
    id: integer().primaryKey(),
    brand: text().notNull(),
    fuel: text().notNull(),
    latitude: real().notNull(),
    licensePlate: text().notNull(),
    longitude: real().notNull(),
    model: text().notNull(),
    modelYear: integer().notNull(),
    nrOfSeats: integer().notNull(),
    picture: text().notNull(),
    price: integer().notNull()
});

export const rentals = sqliteTable("rentals", {
    id: integer().primaryKey(),
    carId: integer()
        .notNull()
        .references(() => cars.id),
    fromDate: text().notNull(),
    latitude: real().notNull(),
    longitude: real().notNull(),
    state: text({
        enum: ["ACTIVE", "RETURNED", "PICKUP", "RESERVED"]
    }).notNull(),
    toDate: text().notNull()
});

export const favorites = sqliteTable("favorites", {
    id: integer().primaryKey({ autoIncrement: true }),
    carId: integer()
        .notNull()
        .references(() => cars.id)
});

export const recentSearches = sqliteTable("recent_searches", {
    id: integer().primaryKey({ autoIncrement: true }),
    query: text().notNull()
});
