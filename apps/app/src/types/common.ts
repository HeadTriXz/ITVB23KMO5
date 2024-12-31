/**
 * A generic type representing a partial response.
 */
export type PartialResponse<T extends { id: number }> = { id: number } & Partial<T>;
