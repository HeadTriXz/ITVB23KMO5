import type { Rental } from "@/data/local/schema";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ErrorBox, NetworkWarningBox, WarningBox } from "@/components/common";
import { useMemo, useState } from "react";

import { Header } from "@/components/layout/header";
import { ThemedView } from "@/components/base";
import { TripCard } from "@/components/cards/TripCard";
import { TripsTabBar } from "@/components/layout/navigation/TripsTabBar";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useRentals } from "@/hooks/rentals/useRentals";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

enum TripsTab {
    Active = "Active",
    Upcoming = "Upcoming",
    Completed = "Completed"
}

const EMPTY_STATE_MESSAGES = {
    [TripsTab.Active]: "You have no active trips.",
    [TripsTab.Upcoming]: "You have no upcoming trips.",
    [TripsTab.Completed]: "You have no completed trips."
};

export default function TripsScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const { isConnected, runWhenConnected } = useNetworkStatus();
    const { error, isLoading, rentals, refresh } = useRentals();
    const [selectedTab, setSelectedTab] = useState<TripsTab>(TripsTab.Active);

    const onTripPress = (rental: Rental) => {
        if (rental.state === "RETURNED") {
            return runWhenConnected(() => {
                router.push(`/cars/${rental.car.id}`);
            });
        }

        router.push(`/trips/${rental.id}`);
    }

    const selectedRentals = useMemo(() => {
        if (!rentals) {
            return [];
        }

        switch (selectedTab) {
            case TripsTab.Active:
                return rentals
                    .filter((rental) => rental.state === "ACTIVE")
                    .sort((a, b) => new Date(a.toDate).getTime() - new Date(b.toDate).getTime());
            case TripsTab.Upcoming:
                return rentals
                    .filter((rental) => rental.state === "RESERVED")
                    .sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime());
            case TripsTab.Completed:
                return rentals.filter((rental) => rental.state === "RETURNED");
        }
    }, [selectedTab, rentals]);

    if (isLoading) {
        return (
            <ThemedView style={styles.container}>
                <Header title="My Trips" withNotificationsButton />
                <View style={styles.centered}>
                    <ActivityIndicator size="large" />
                </View>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="My Trips" withNotificationsButton />
            <TripsTabBar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
            <FlatList
                data={selectedRentals}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TripCard
                        car={item.car}
                        rental={item}
                        onPress={() => onTripPress(item)}
                        withPaymentStatus
                    />
                )}
                ListEmptyComponent={error
                    ? <ErrorBox message={error.message} />
                    : <WarningBox message={EMPTY_STATE_MESSAGES[selectedTab]} />
                }
                ListHeaderComponent={isConnected ? null : <NetworkWarningBox />}
                refreshing={isLoading}
                onRefresh={refresh}
            />
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    centered: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        paddingBottom: 68,
        paddingHorizontal: 16,
        paddingTop: 78
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 26,
        paddingTop: 26
    },
    selectedTabText: {
        backgroundColor: theme.colors.buttonPrimary,
        borderRadius: 7,
        color: theme.colors.card
    },
    tab: {
        flex: 1
    },
    tabText: {
        color: theme.colors.textPrimary,
        padding: 13,
        textAlign: "center"
    },
    tabsContainer: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        marginBottom: 15,
        padding: 10
    }
});
