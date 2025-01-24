import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export type Car = typeof cars.$inferSelect;
export type Rental = typeof rentals.$inferSelect & { car: Car };
export type Favorite = typeof favorites.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export type CarInsert = typeof cars.$inferInsert;
export type RentalInsert = typeof rentals.$inferInsert;
export type FavoriteInsert = typeof favorites.$inferInsert;
export type NotificationInsert = typeof notifications.$inferInsert;

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

export const notifications = sqliteTable("notifications", {
    id: integer().primaryKey({ autoIncrement: true }),
    body: text().notNull(),
    isRead: integer({ mode: "boolean" })
        .notNull()
        .default(false),
    title: text().notNull(),
    type: text().notNull(),
    rentalId: integer()
        .notNull()
        .references(() => rentals.id, { onDelete: "cascade" }),
    createdAt: integer({ mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`)
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
    rental: one(rentals, {
        fields: [notifications.rentalId],
        references: [rentals.id]
    })
}));
