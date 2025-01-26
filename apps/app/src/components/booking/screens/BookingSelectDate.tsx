import type { APIGetRentalResult } from "@/types/api";
import type { DateData } from "react-native-calendars";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Calendar, DateDisplay } from "@/components/booking/calendar";
import { ThemedText, ThemedView } from "@/components/base";
import { getDatesBetween, getDateString, isDateInRange } from "@/utils/dates";
import { useEffect, useState } from "react";

import { BookingHeader } from "@/components/booking/BookingHeader";
import { Header } from "@/components/layout/header";
import { MAX_RENTAL_DAYS } from "@/constants/rental";
import { PrimaryButton } from "@/components/common/buttons";
import { WarningBox } from "@/components/common";
import { useData } from "@/hooks/useData";
import { useTheme } from "@/hooks/useTheme";
import { useCar } from "@/hooks/cars/useCar";

interface SelectDateButtonProps {
    isLoading?: boolean;
    label?: string;
    onPress: (fromDate: string, toDate: string) => void;
}

interface SelectDateProps {
    button: SelectDateButtonProps;
    carId: number;
    excludedRentals?: number[];
    initialFromDate?: string | null;
    initialToDate?: string | null;
}

export function BookingSelectDate({
    carId,
    excludedRentals,
    initialFromDate = null,
    initialToDate = null,
    button: {
        isLoading = false,
        label = "Next",
        onPress
    }
}: SelectDateProps) {
    const theme = useTheme();

    const { api } = useData();
    const { car, isLoading: isLoadingCar, error: carError } = useCar(carId);

    const [rentals, setRentals] = useState<APIGetRentalResult[]>([]);
    const [isLoadingRentals, setIsLoadingRentals] = useState(true);

    const [fromDate, setFromDate] = useState<string | null>(initialFromDate);
    const [toDate, setToDate] = useState<string | null>(initialToDate);
    const [days, setDays] = useState<number>(0);

    const [warning, setWarning] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleNext = () => {
        if (fromDate && toDate) {
            onPress(fromDate, toDate);
        }
    };

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
                    dates[date] = { color: "#FFE7CC", textColor: "#CB7A00" };
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
        const fetchRentals = async () => {
            if (!api) {
                return;
            }

            try {
                const rentals = await api.rentals.getRentals({
                    "carId.equals": carId,
                    "id.notIn": excludedRentals,
                    "toDate.greaterThanOrEqual": getDateString(new Date()),
                    "state.notEquals": "RETURNED",
                    "sort": ["fromDate,asc"]
                });

                setRentals(rentals);
            } catch {
                setError("Failed to fetch rentals.");
            } finally {
                setIsLoadingRentals(false);
            }
        }

        fetchRentals();
    }, [carId, excludedRentals]);

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

    if (carError || error) {
        return (
            <ThemedView style={styles.screenContainer}>
                <Header withBackButton />
                <ThemedText>{carError?.message || error}</ThemedText>
            </ThemedView>
        );
    }

    if (isLoadingRentals || isLoadingCar || !car) {
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
                    <PrimaryButton
                        onPress={handleNext}
                        style={styles.nextButton}
                        loading={isLoading}
                        disabled={!fromDate || !toDate}
                    >
                        {label}
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
        padding: 16
    }
});
