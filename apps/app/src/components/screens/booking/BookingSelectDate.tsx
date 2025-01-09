import type { APIGetCarResult, APIGetRentalResult } from "@/types/api";
import type { DateData } from "react-native-calendars";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Calendar, DateDisplay } from "@/components/calendar";
import { ThemedText, ThemedView } from "@/components/base";
import { getDatesBetween, getDateString, isDateInRange } from "@/utils/dates";
import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { MAX_RENTAL_DAYS } from "@/constants/rental";
import { PrimaryButton } from "@/components/buttons";
import { WarningBox } from "@/components/WarningBox";
import { useAPI } from "@/hooks/useAPI";
import { useTheme } from "@/hooks/useTheme";
import { BookingHeader } from "@/components/BookingHeader";

interface SelectDateProps {
    carId: number;
    onNext: (fromDate: string, toDate: string) => void;
}

export function BookingSelectDate({ carId, onNext }: SelectDateProps) {
    const { api } = useAPI();
    const theme = useTheme();

    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const [days, setDays] = useState<number>(0);

    const [car, setCar] = useState<APIGetCarResult | null>(null);
    const [rentals, setRentals] = useState<APIGetRentalResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [warning, setWarning] = useState<string>("");
    const [error, setError] = useState<string>("");

    const isDateAvailable = (date: string): boolean => {
        return !rentals.some((rental) => isDateInRange(date, rental.fromDate, rental.toDate));
    };

    const isValidDateRange = (start: string, end: string): boolean => {
        const dates = getDatesBetween(new Date(start), new Date(end));
        return dates.every((date) => isDateAvailable(date));
    };

    const handleDateSelection = (selectedDate: DateData) => {
        setWarning("");

        if (!isDateAvailable(selectedDate.dateString)) {
            setWarning("This date is already booked. Please select another date.");
            setFromDate(null);
            setToDate(null);
            return;
        }

        if (fromDate && toDate) {
            setFromDate(selectedDate.dateString);
            setToDate(null);
            return;
        }

        if (fromDate) {
            const [start, end] = [fromDate, selectedDate.dateString].sort();
            if (!isValidDateRange(start, end)) {
                setWarning("Some dates in the range are already booked. Please select another date.");
                setFromDate(null);
                setToDate(null);
                return;
            }

            setFromDate(start);
            setToDate(end);
            return;
        }

        setFromDate(selectedDate.dateString);
    };

    const getMarkedDates = () => {
        const dates: Record<string, any> = {};
        if (rentals) {
            for (const rental of rentals) {
                const start = new Date(rental.fromDate);
                const end = new Date(rental.toDate);

                for (const date of getDatesBetween(start, end)) {
                    dates[date] = { color: "orange", textColor: theme.colors.card };
                }

                dates[getDateString(end)].endingDay = true;
                dates[getDateString(start)].startingDay = true;
            }
        }

        if (fromDate) {
            dates[fromDate] = {
                color: theme.colors.buttonPrimary,
                startingDay: true,
                textColor: theme.colors.background,
            };
        }

        if (toDate) {
            dates[toDate] = {
                color: theme.colors.buttonPrimary,
                endingDay: true,
                textColor: theme.colors.background,
                startingDay: fromDate === toDate
            };

            if (fromDate) {
                const periodDates = getDatesBetween(
                    new Date(fromDate),
                    new Date(toDate)
                );

                periodDates.forEach((date) => {
                    if (date !== fromDate && date !== toDate) {
                        dates[date] = {
                            color: theme.colors.buttonPrimary,
                            textColor: theme.colors.background
                        };
                    }
                });
            }
        }

        return dates;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const car = await api.getCar(carId);
                const rentals = await api.getRentals({
                    "carId.equals": car.id,
                    "toDate.greaterThanOrEqual": getDateString(new Date()),
                    "state.notEquals": "RETURNED",
                    "sort": ["fromDate,asc"]
                });

                setCar(car);
                setRentals(rentals);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch car details.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [carId]);

    useEffect(() => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);

            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            if (diffDays > MAX_RENTAL_DAYS) {
                setWarning(`The maximum rental period is ${MAX_RENTAL_DAYS} days.`);
                setToDate(null);
                return;
            }

            setDays(diffDays);
        } else {
            setDays(0);
        }
    }, [fromDate, toDate]);

    const handleNext = useCallback(() => {
        if (fromDate && toDate) {
            onNext(fromDate, toDate);
        }
    }, [fromDate, toDate, onNext]);

    if (error) {
        return (
            <ThemedView style={styles.screenContainer}>
                <Header withBackButton />
                <ThemedText>{error}</ThemedText>
            </ThemedView>
        );
    }

    if (isLoading || !car) {
        return (
            <ThemedView style={styles.screenContainer}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <BookingHeader car={car} />
            <View style={styles.contentContainer}>
                <View style={styles.calendarContainer}>
                    <Calendar
                        markedDates={getMarkedDates()}
                        onDayPress={handleDateSelection}
                    />
                    {warning
                        ? <WarningBox message={warning} />
                        : <DateDisplay fromDate={fromDate} toDate={toDate} style={styles.dateDisplay} />
                    }
                </View>
                <View style={styles.pricingRow}>
                    <View style={styles.pricingContainer}>
                        <ThemedText variant="headingMedium" style={styles.pricingText}>€{days * car.price}</ThemedText>
                        <ThemedText>total</ThemedText>
                    </View>
                    <PrimaryButton onPress={handleNext} style={styles.nextButton} disabled={!fromDate || !toDate}>
                        Next
                    </PrimaryButton>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        gap: 15
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    dateDisplay: {
        marginTop: 15
    },
    nextButton: {
        width: "50%"
    },
    pricingContainer: {
        alignItems: "flex-end"
    },
    pricingRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pricingText: {
        lineHeight: 20
    },
    screenContainer: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    }
});
