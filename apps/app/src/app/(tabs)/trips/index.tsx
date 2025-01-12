import type { APIGetCarResult, APIGetRentalResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ErrorBox, WarningBox } from "@/components/common";
import { useEffect, useMemo, useState } from "react";

import { Header } from "@/components/layout/header";
import { ThemedView } from "@/components/base";
import { TripCard } from "@/components/cards/TripCard";
import { TripsTabBar } from "@/components/layout/navigation/TripsTabBar";
import { useData } from "@/hooks/useData";
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
    const { api } = useData();
    const theme = useTheme();
    const styles = useStyles(theme);

    const [selectedTab, setSelectedTab] = useState<TripsTab>(TripsTab.Active);
    const [rentals, setRentals] = useState<APIGetRentalResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const customer = await api!.customers.getCustomer();
            const rentals = await api!.rentals.getRentals({
                "customerId.equals": customer.id,
                "sort": ["toDate,desc"]
            });

            for (const rental of rentals) {
                if (!rental.car || rental.car.model !== undefined) {
                    continue;
                }

                rental.car = await api!.cars.getCar(rental.car.id);
            }

            setRentals(rentals);
        } catch {
            setError("Failed to fetch rentals.");
        } finally {
            setIsLoading(false);
        }
    }

    const onTripPress = (rental: APIGetRentalResult) => {
        console.log("Trip pressed", rental.id);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const selectedRentals = useMemo(() => {
        switch (selectedTab) {
            case TripsTab.Active:
                return rentals.filter((rental) => rental.state === "ACTIVE");
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
                        car={item.car as APIGetCarResult}
                        rental={item}
                        onPress={() => onTripPress(item)}
                    />
                )}
                ListEmptyComponent={error
                    ? <ErrorBox message={error} />
                    : <WarningBox message={EMPTY_STATE_MESSAGES[selectedTab]} />
                }
                refreshing={isLoading}
                onRefresh={fetchData}
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
        padding: 24,
        paddingBottom: 76
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 25
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
