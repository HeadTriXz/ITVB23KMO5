/**
 * Get the current date in the format "YYYY-MM-DD"
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function getDateString(date: Date): string {
    return date.toISOString().split("T")[0];
}

/**
 * Get the current time in the format "HH:MM"
 *
 * @param date The date to format.
 * @returns The formatted time.
 */
export function humanReadableTime(date: Date): string {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}

/**
 * Get the current date in the format "Mon DD, YYYY"
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function humanReadableDate(date: string | null): string {
    if (!date) {
        return "Select Date";
    }

    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

/**
 * Check if a date is in the range of two other dates.
 *
 * @param date The date to check.
 * @param start The start of the range.
 * @param end The end of the range.
 * @returns Whether the date is in the range.
 */
export function isDateInRange(date: string, start: string, end: string): boolean {
    const checkDate = new Date(date).getTime();
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    return checkDate >= startDate && checkDate <= endDate;
}

/**
 * Get all dates between two dates.
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @returns An array of dates between the two dates.
 */
export function getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(getDateString(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
