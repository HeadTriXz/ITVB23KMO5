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

/**
 * Format a date to be human-readable.
 *
 * @param date The date to format.
 * @returns The formatted date.
 */
export function getTimeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 30) return `${days}d`;
    if (months < 12) return `${months}mo`;

    return `${years}y`;
}

/**
 * Check if a date is in the past.
 *
 * @param date The date to check.
 * @returns Whether the date is in the past.
 */
export function isPast(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
}

/**
 * Check if a date is today.
 *
 * @param date The date to check.
 * @returns Whether the date is today.
 */
export function isToday(date: Date): boolean {
    const today = new Date();

    return date.getDate() === today.getDate()
        && date.getMonth() === today.getMonth()
        && date.getFullYear() === today.getFullYear();
}

/**
 * Check if a date is tomorrow.
 *
 * @param date The date to check.
 * @returns Whether the date is tomorrow.
 */
export function isTomorrow(date: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return date.getDate() === tomorrow.getDate()
        && date.getMonth() === tomorrow.getMonth()
        && date.getFullYear() === tomorrow.getFullYear();
}
