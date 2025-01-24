import {
    getDateString,
    humanReadableTime,
    humanReadableDate,
    isDateInRange,
    getDatesBetween,
    getTimeAgo,
    isPast,
    isToday,
    isTomorrow
} from "@/utils/dates";

describe("Date Utils", () => {
    const NOW = new Date("2025-01-24T20:00:00Z");

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(NOW);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("getDateString", () => {
        it("should format date as YYYY-MM-DD", () => {
            const date = new Date("2025-01-24T15:30:00Z");

            expect(getDateString(date)).toBe("2025-01-24");
        });

        it("should handle different months and days", () => {
            const date = new Date("2025-12-05T15:30:00Z");

            expect(getDateString(date)).toBe("2025-12-05");
        });
    });

    describe("humanReadableTime", () => {
        it("should format time in 12-hour format with minutes", () => {
            const date = new Date("2025-01-24T15:30:00Z");

            expect(humanReadableTime(date)).toBe("3:30 PM");
        });

        it("should handle midnight", () => {
            const date = new Date("2025-01-24T00:00:00Z");

            expect(humanReadableTime(date)).toBe("12:00 AM");
        });

        it("should handle noon", () => {
            const date = new Date("2025-01-24T12:00:00Z");

            expect(humanReadableTime(date)).toBe("12:00 PM");
        });
    });

    describe("humanReadableDate", () => {
        it("should format date as 'Mon DD, YYYY;", () => {
            expect(humanReadableDate("2025-01-24")).toBe("Jan 24, 2025");
        });

        it("should return 'Select Date' for null input", () => {
            expect(humanReadableDate(null)).toBe("Select Date");
        });

        it("should handle different months", () => {
            expect(humanReadableDate("2025-12-05")).toBe("Dec 5, 2025");
        });
    });

    describe("isDateInRange", () => {
        it("should return true when date is within range", () => {
            expect(isDateInRange("2025-01-24", "2025-01-01", "2025-01-31")).toBe(true);
        });

        it("should return true when date is at range boundaries", () => {
            expect(isDateInRange("2025-01-01", "2025-01-01", "2025-01-31")).toBe(true);
            expect(isDateInRange("2025-01-31", "2025-01-01", "2025-01-31")).toBe(true);
        });

        it("should return false when date is outside range", () => {
            expect(isDateInRange("2025-02-01", "2025-01-01", "2025-01-31")).toBe(false);
        });
    });

    describe("getDatesBetween", () => {
        it("should return array of dates between start and end dates", () => {
            const start = new Date("2025-01-01");
            const end = new Date("2025-01-03");

            expect(getDatesBetween(start, end)).toEqual(["2025-01-01", "2025-01-02", "2025-01-03"]);
        });

        it("should handle same start and end date", () => {
            const date = new Date("2025-01-01");

            expect(getDatesBetween(date, date)).toEqual(["2025-01-01"]);
        });
    });

    describe("getTimeAgo", () => {
        it("should return 'just now' for less than a minute ago", () => {
            const date = new Date(NOW.getTime() - 30 * 1000);

            expect(getTimeAgo(date)).toBe("just now");
        });

        it("should return minutes for less than an hour ago", () => {
            const date = new Date(NOW.getTime() - 45 * 60 * 1000);

            expect(getTimeAgo(date)).toBe("45m");
        });

        it("should return hours for less than a day ago", () => {
            const date = new Date(NOW.getTime() - 5 * 60 * 60 * 1000);

            expect(getTimeAgo(date)).toBe("5h");
        });

        it("should return days for less than a month ago", () => {
            const date = new Date(NOW.getTime() - 15 * 24 * 60 * 60 * 1000);

            expect(getTimeAgo(date)).toBe("15d");
        });

        it("should return months for less than a year ago", () => {
            const date = new Date(NOW.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);

            expect(getTimeAgo(date)).toBe("6mo");
        });

        it("should return years for more than a year ago", () => {
            const date = new Date(NOW.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);

            expect(getTimeAgo(date)).toBe("2y");
        });
    });

    describe("isPast", () => {
        it("should return true for past dates", () => {
            const pastDate = new Date("2024-12-31");

            expect(isPast(pastDate)).toBe(true);
        });

        it("should return false for future dates", () => {
            const futureDate = new Date("2025-02-01");

            expect(isPast(futureDate)).toBe(false);
        });
    });

    describe("isToday", () => {
        it("should return true for today", () => {
            const today = new Date(NOW);

            expect(isToday(today)).toBe(true);
        });

        it("should return false for other dates", () => {
            const notToday = new Date("2025-01-23");

            expect(isToday(notToday)).toBe(false);
        });
    });

    describe("isTomorrow", () => {
        it("should return true for tomorrow", () => {
            const tomorrow = new Date("2025-01-25");

            expect(isTomorrow(tomorrow)).toBe(true);
        });

        it("should return false for other dates", () => {
            const notTomorrow = new Date("2025-01-26");

            expect(isTomorrow(notTomorrow)).toBe(false);
        });

        it("should handle month boundaries", () => {
            const lastDayOfMonth = new Date("2025-01-31T20:00:00Z");
            jest.setSystemTime(lastDayOfMonth);

            const firstDayNextMonth = new Date("2025-02-01");
            expect(isTomorrow(firstDayNextMonth)).toBe(true);
        });
    });
});
