import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { useLocalSearchParams, useRouter } from "expo-router";

import { BookingSelectDate } from "@/components/booking/screens";
import { Header } from "@/components/layout/header";
import { useEditRental } from "@/hooks/rentals/useEditRental";
import { useRental } from "@/hooks/rentals/useRental";

export default function TripAdjustDateScreen() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { isLoading, error, rental } = useRental(Number(id));
    const { isPending, error: editError, editRentalAsync } = useEditRental();

    const onPress = (fromDate: string, toDate: string) => {
        editRentalAsync(Number(id), { fromDate, toDate })
            .then(() => router.back());
    };

    if (error || editError) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ThemedText>{error?.message ?? editError?.message}</ThemedText>
            </ThemedView>
        );
    }

    if (isLoading || !rental) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <BookingSelectDate
            button={{
                label: "Confirm",
                isLoading: isPending,
                onPress: onPress
            }}
            carId={rental.car.id}
            excludedRentals={[rental.id]}
            initialFromDate={rental.fromDate}
            initialToDate={rental.toDate}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 94
    }
});
