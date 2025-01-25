import type { Rental } from "@/data/local/schema";

import { ErrorBox, WarningBox } from "@/components/common";
import { FlatList, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { Header } from "@/components/layout/header";
import { TripCard } from "@/components/cards/TripCard";
import { useRentals } from "@/hooks/rentals/useRentals";
import { useRouter } from "expo-router";

export default function SupportSelectDamageScreen() {
    const router = useRouter();
    const { error, isLoading, rentals, refresh } = useRentals();

    const activeRentals = rentals
        ?.filter((rental) => rental.state === "ACTIVE")
        ?.sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime());

    const onTripPress = (rental: Rental) => {
        router.back();
        router.push(`/(tabs)/trips/${rental.id}/damage`);
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Report Damage" withBackButton />
            <ThemedText variant="headingMedium" style={styles.heading}>
                Select a Trip
            </ThemedText>
            <FlatList
                data={activeRentals}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TripCard
                        car={item.car}
                        rental={item}
                        onPress={() => onTripPress(item)}
                    />
                )}
                ListEmptyComponent={error
                    ? <ErrorBox message={error.message} />
                    : <WarningBox message="You have no active rentals." />
                }
                refreshing={isLoading}
                onRefresh={refresh}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 68
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 25
    },
    heading: {
        marginBottom: 10
    }
});
