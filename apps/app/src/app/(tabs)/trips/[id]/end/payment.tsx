import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { BookingHeader } from "@/components/booking/BookingHeader";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { PaymentOverviewCard } from "@/components/cards/PaymentOverviewCard";
import { PrimaryButton } from "@/components/common/buttons";
import { ThemedView } from "@/components/base";
import { useData } from "@/hooks/useData";
import { useEditRental } from "@/hooks/rentals/useEditRental";
import { useEndRental } from "@/hooks/useEndRental";
import { useRental } from "@/hooks/rentals/useRental";
import { useState } from "react";

export default function PaymentScreen() {
    const router = useRouter();

    const { api } = useData();
    const { data } = useEndRental();
    const { editRentalAsync } = useEditRental();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { error: rentalError, isLoading, rental } = useRental(Number(id), {
        skipStorageLoad: true
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    if (!data.location || !data.mileage) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message="Missing required data. Please go back and try again." />
            </ThemedView>
        );
    }

    const onConfirm = async () => {
        if (!api || !data.location || !data.mileage || !rental?.car) {
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await api.inspections.createInspection({
                car: { id: rental.car.id },
                rental: { id: rental.id },
                odometer: data.mileage.value,
                photo: data.mileage.image,
                photoContentType: "image/jpeg"
            });

            await editRentalAsync(Number(id), {
                latitude: data.location.latitude,
                longitude: data.location.longitude,
                state: "RETURNED"
            });

            router.dismissTo("/(tabs)/trips");
            router.push("/(tabs)/trips/success");
        } catch {
            setError("Failed to process payment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (rentalError) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message={rentalError.message} />
            </ThemedView>
        );
    }

    if (isLoading || !rental?.car) {
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
            <BookingHeader car={rental.car} />
            <View style={styles.content}>
                <ScrollView>
                    <View style={styles.scrollContainer}>
                        {error && <ErrorBox message={error} />}
                        <PaymentOverviewCard rental={rental} />
                    </View>
                </ScrollView>
                <PrimaryButton onPress={onConfirm} loading={isSubmitting}>
                    Confirm & Pay
                </PrimaryButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    content: {
        flex: 1,
        gap: 15,
        justifyContent: "space-between"
    },
    scrollContainer: {
        gap: 15
    }
});
