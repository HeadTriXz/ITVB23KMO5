import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { count, desc, eq } from "drizzle-orm";
import * as schema from "@/data/local/schema";

/**
 * The repository for the notifications table.
 */
export class NotificationsRepository {
    /**
     * The database to use.
     * @private
     */
    readonly #db: ExpoSQLiteDatabase<typeof schema>;

    /**
     * The repository for the notifications table.
     *
     * @param db The database to use.
     */
    constructor(db: ExpoSQLiteDatabase<typeof schema>) {
        this.#db = db;
    }

    /**
     * Clears all notifications.
     */
    async clear(): Promise<void> {
        await this.#db.delete(schema.notifications);
    }

    /**
     * Counts the number of unread notifications.
     *
     * @returns The number of unread notifications.
     */
    async countUnread(): Promise<number> {
        return this.#db.select({ count: count() })
            .from(schema.notifications)
            .where(eq(schema.notifications.isRead, false))
            .then((result) => result[0].count);
    }

    /**
     * Creates a new notification.
     *
     * @param notification The notification to create.
     * @returns The created notification.
     */
    async create(notification: schema.NotificationInsert): Promise<schema.Notification[]> {
        return this.#db.insert(schema.notifications)
            .values(notification)
            .returning();
    }

    /**
     * Gets all notifications for a rental.
     *
     * @returns The notifications.
     */
    async getByRentalId(rentalId: number): Promise<schema.Notification[]> {
        return this.#db.query.notifications.findMany({
            where: eq(schema.notifications.rentalId, rentalId)
        });
    }

    /**
     * Gets all notifications that have been sent.
     *
     * @returns The notifications that have been sent.
     */
    async getAll(): Promise<schema.Notification[]> {
        return this.#db.query.notifications.findMany({
            orderBy: [desc(schema.notifications.createdAt)]
        });
    }

    /**
     * Marks a notification as read.
     *
     * @param id The ID of the notification to mark as read.
     */
    async markAsRead(id: number): Promise<void> {
        await this.#db.update(schema.notifications)
            .set({ isRead: true })
            .where(eq(schema.notifications.id, id));
    }
}
