/**
 * The available options for numeric filters.
 */
export type APIGetNumericFilterOptions =
    "equals"
    | "greaterThan"
    | "greaterThanOrEqual"
    | "in"
    | "lessThan"
    | "lessThanOrEqual"
    | "notEquals"
    | "notIn"
    | "specified";

/**
 * The available options for string filters.
 */
export type APIGetStringFilterOptions =
    "contains"
    | "doesNotContain"
    | "equals"
    | "in"
    | "notEquals"
    | "notIn"
    | "specified";

/**
 * The available filters for a numeric field.
 */
export type APIGetNumericFilters<K extends string> = {
    [P in `${K}.${APIGetNumericFilterOptions}`]?: P extends `${K}.in` | `${K}.notIn`
        ? number[]
        : P extends `${K}.specified`
            ? boolean
            : number;
}

/**
 * The available filters for a string field.
 */
export type APIGetStringFilters<K extends string> = {
    [P in `${K}.${APIGetStringFilterOptions}`]?: P extends `${K}.in` | `${K}.notIn`
        ? string[]
        : P extends `${K}.specified`
            ? boolean
            : string;
}

/**
 * The available filters for a date field.
 */
export type APIGetDateFilters<K extends string> = {
    [P in `${K}.${APIGetNumericFilterOptions}`]?: P extends `${K}.in` | `${K}.notIn`
        ? string[]
        : P extends `${K}.specified`
            ? boolean
            : string;
}
