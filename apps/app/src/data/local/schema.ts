import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export type Car = typeof cars.$inferSelect;
export type Rental = typeof rentals.$inferSelect & { car: Car };
export type Favorite = typeof favorites.$inferSelect;
export type RecentSearch = typeof recentSearches.$inferSelect;

export type CarInsert = typeof cars.$inferInsert;
export type RentalInsert = typeof rentals.$inferInsert;
export type FavoriteInsert = typeof favorites.$inferInsert;
export type RecentSearchInsert = typeof recentSearches.$inferInsert;

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
        .references(() => cars.id, { onDelete: "cascade" }),
    fromDate: text().notNull(),
    latitude: real().notNull(),
    longitude: real().notNull(),
    state: text().notNull(),
    toDate: text().notNull()
});

export const rentalsRelations = relations(rentals, ({ one }) => ({
    car: one(cars, {
        fields: [rentals.carId],
        references: [cars.id]
    })
}));

export const favorites = sqliteTable("favorites", {
    id: integer().primaryKey({ autoIncrement: true }),
    carId: integer()
        .notNull()
        .references(() => cars.id, { onDelete: "cascade" })
});

export const favoritesRelations = relations(favorites, ({ one }) => ({
    car: one(cars, {
        fields: [favorites.carId],
        references: [cars.id]
    })
}));

export const recentSearches = sqliteTable("recent_searches", {
    id: integer().primaryKey({ autoIncrement: true }),
    query: text().notNull()
});
