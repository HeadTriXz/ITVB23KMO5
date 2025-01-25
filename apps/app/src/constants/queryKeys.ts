/**
 * The keys for the queries.
 */
export const QueryKeys = {
    ACCOUNT: ["account"] as const,
    FAVORITE: (id: number) => ["favorites", id] as const,
    FAVORITES: ["favorites"] as const,
    NOTIFICATIONS: ["notifications"] as const,
    NOTIFICATIONS_COUNT: ["notifications", "count"] as const,
    RENTAL: (id: number) => ["rental", id] as const,
    RENTALS: ["rentals"] as const
} as const;
