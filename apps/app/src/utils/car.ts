import { BODY_TYPES, FUEL_TYPES } from "@/constants/cars";

/**
 * Returns a pretty string representation of a car fuel type.
 *
 * @param fuel The car fuel type.
 * @returns The pretty string representation.
 */
export function prettyFuel(fuel: string): string {
    return FUEL_TYPES.find((f) => f.value === fuel)?.label || fuel;
}

/**
 * Returns a pretty string representation of a car body type.
 *
 * @param body The car body type.
 * @returns The pretty string representation.
 */
export function prettyBodyType(body: string): string {
    return BODY_TYPES.find((b) => b.value === body)?.label || body;
}
