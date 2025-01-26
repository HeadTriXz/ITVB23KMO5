import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useState } from "react";

import { BookingHeader } from "@/components/booking/BookingHeader";
import { BookingOverviewCard } from "@/components/cards/BookingOverviewCard";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { PrimaryButton } from "@/components/common/buttons";
import { ThemedView } from "@/components/base";
import { useCar } from "@/hooks/cars/useCar";
import { useCreateRental } from "@/hooks/rentals/useCreateRental";
import { useData } from "@/hooks/useData";

interface BookingOverviewProps {
    id: number;
    fromDate: string;
    toDate: string;
    onSuccess: () => void;
}

export function BookingOverview({ id, fromDate, toDate, onSuccess }: BookingOverviewProps) {
    const { api } = useData();
    const { car, isLoading: isLoadingCar, error: carError } = useCar(id);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const { createRentalAsync } = useCreateRental();

    const checkAvailability = useCallback(async () => {
        if (!api) {
            return;
        }

        try {
            const rentals = await api.rentals.getRentals({
                "carId.equals": id,
                "fromDate.greaterThanOrEqual": fromDate,
                "toDate.lessThanOrEqual": toDate,
                "state.notEquals": "RETURNED",
                "sort": ["fromDate,asc"]
            });

            if (rentals && rentals.length > 0) {
                setError("This car is not available for the selected dates.");
            }
        } catch {
            setError("Failed to check car availability.");
        } finally {
            setIsLoading(false);
        }
    }, [api, fromDate, toDate]);

    const onConfirm = useCallback(async () => {
        if (!api || !car) {
            return;
        }

        try {
            const customer = await api.customers.getCustomer();
            await createRentalAsync({
                car: {
                    id: car.id
                },
                customer: {
                    id: customer.id
                },
                fromDate: fromDate,
                latitude: car.latitude,
                longitude: car.longitude,
                state: "RESERVED",
                toDate: toDate
            });

            onSuccess();
        } catch {
            setError("Failed to create booking.");
        }
    }, [car, fromDate, toDate, onSuccess]);

    useEffect(() => {
        checkAvailability();
    }, [checkAvailability]);

    if (carError || error) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message={carError?.message || error} />
            </ThemedView>
        );
    }

    if (isLoading || isLoadingCar || !car) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header />
            <View style={styles.content}>
                <BookingHeader car={car} />
                <BookingOverviewCard car={car} fromDate={fromDate} toDate={toDate} />
            </View>
            <PrimaryButton onPress={onConfirm}>Confirm</PrimaryButton>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    content: {
        flex: 1
    }
});
