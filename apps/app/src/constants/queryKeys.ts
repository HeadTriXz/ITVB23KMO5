/**
 * The keys for the queries.
 */
export const QueryKeys = {
    RENTAL: (id: number) => ["rental", id] as const,
    RENTALS: ["rentals"] as const
} as const;
