import type { APIGetCarResult } from "@/types/api";

import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ErrorBox, NetworkWarningBox, WarningBox } from "@/components/common";
import { ThemedText, ThemedView } from "@/components/base";
import { useCallback, useEffect, useState } from "react";

import { AvailableCarCard } from "@/components/cards/AvailableCarCard";
import { Header } from "@/components/layout/header";
import { useData } from "@/hooks/useData";
import { useFavorites } from "@/hooks/favorites/useFavorites";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
    const router = useRouter();

    const [cars, setCars] = useState<APIGetCarResult[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const { api } = useData();
    const { favorites } = useFavorites();
    const { isConnected, runWhenConnected } = useNetworkStatus();

    const onCarPress = (car: APIGetCarResult) => {
        runWhenConnected(() => {
            router.push(`/(tabs)/favorites/(car)/${car.id}`);
        });
    };

    const fetchCars = useCallback(async () => {
        if (!api || !favorites) {
            return;
        }

        setIsLoading(true);

        try {
            const cars = await Promise.all(
                favorites.map((carId) => api.cars.getCar(carId))
            );

            setCars(cars);
        } catch {
            setError("Failed to fetch favorite cars.");
        } finally {
            setIsLoading(false);
        }
    }, [favorites]);

    useEffect(() => {
        fetchCars();
    }, [favorites]);

    if (isLoading) {
        return (
            <ThemedView style={[styles.container, styles.centered]}>
                <Header withNotificationsButton />
                <ActivityIndicator size="large" />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header withNotificationsButton />
            <ThemedText variant="headingMedium" style={styles.heading}>Favorite Cars</ThemedText>
            <FlatList
                data={cars}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AvailableCarCard car={item} onPress={() => onCarPress(item)} withFavoriteButton />
                )}
                ListEmptyComponent={isLoading
                    ? <ActivityIndicator />
                    : error
                        ? <ErrorBox message={error} />
                        : <WarningBox message="You have no favorite cars." />
                }
                ListHeaderComponent={isConnected ? null : <NetworkWarningBox />}
                refreshing={isLoading}
                onRefresh={fetchCars}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    centered: {
        alignItems: "center",
        justifyContent: "center"
    },
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
