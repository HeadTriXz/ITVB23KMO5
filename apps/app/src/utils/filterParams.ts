import type { SearchFilters } from "@/types/search";

/**
 * Parses a string into a number.
 *
 * @param param The string to parse.
 * @returns The number.
 */
function parseNumber(param: string | undefined): number | undefined {
    return param ? Number(param) : undefined;
}

/**
 * Parses search filters from query parameters.
 *
 * @param params The query parameters.
 * @returns The search filters.
 */
export function parseFiltersFromParams(params: Record<string, string>): SearchFilters {
    return {
        minPrice: parseNumber(params.minPrice),
        maxPrice: parseNumber(params.maxPrice),
        minYear: parseNumber(params.minYear),
        maxYear: parseNumber(params.maxYear),
        minSeats: parseNumber(params.minSeats),
        maxSeats: parseNumber(params.maxSeats),
        body: params.body?.split(","),
        fuel: params.fuel?.split(","),
        brands: params.brands?.split(","),
        models: params.models?.split(",")
    };
}

/**
 * Creates query parameters from search filters.
 *
 * @param filters The search filters.
 * @returns The query parameters.
 */
export function createParamsFromFilters(filters: SearchFilters): Record<string, string> {
    const params: Record<string, string> = {};

    const addParam = (key: string, value: string | undefined) => {
        if (value) params[key] = value;
    }

    addParam("minPrice", filters.minPrice?.toString());
    addParam("maxPrice", filters.maxPrice?.toString());
    addParam("minYear", filters.minYear?.toString());
    addParam("maxYear", filters.maxYear?.toString());
    addParam("minSeats", filters.minSeats?.toString());
    addParam("maxSeats", filters.maxSeats?.toString());
    addParam("body", filters.body?.join(","));
    addParam("fuel", filters.fuel?.join(","));
    addParam("brands", filters.brands?.join(","));
    addParam("models", filters.models?.join(","));

    return params;
}
