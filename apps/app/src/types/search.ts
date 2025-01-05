export interface SearchFilters {
    body?: string[];
    brands?: string[];
    fuel?: string[];
    maxPrice?: number;
    maxSeats?: number;
    maxYear?: number;
    minPrice?: number;
    minSeats?: number;
    minYear?: number;
    models?: string[];
}

export type SearchParams = Partial<Record<keyof SearchFilters | "query", string>>;
