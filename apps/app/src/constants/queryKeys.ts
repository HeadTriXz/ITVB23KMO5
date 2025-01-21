/**
 * The keys for the queries.
 */
export const QueryKeys = {
    ACCOUNT: ["account"] as const,
    NOTIFICATIONS: ["notifications"] as const,
    NOTIFICATIONS_COUNT: ["notifications", "count"] as const,
    RENTAL: (id: number) => ["rental", id] as const,
    RENTALS: ["rentals"] as const
} as const;
