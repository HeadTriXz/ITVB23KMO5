import type { APIGetCarResult } from "@/types/api";
import type { CarBrand } from "@/constants/cars";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ErrorBox, NetworkWarningBox } from "@/components/common";
import { ThemedText, ThemedView } from "@/components/base";

import { AvailableCarCard } from "@/components/cards/AvailableCarCard";
import { Header } from "@/components/layout/header";
import { SearchWithFilter } from "@/components/common/forms";
import { TopBrandCard } from "@/components/cards/TopBrandCard";
import { createParamsFromFilters } from "@/utils/filterParams";
import { useCarSearch } from "@/hooks/cars/useCarSearch";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useRouter } from "expo-router";

import React from "react";

export default function HomeScreen() {
    const { isConnected, runWhenConnected } = useNetworkStatus();

    const router = useRouter();
    const { cars, isLoading, refresh } = useCarSearch({
        pageSize: 5
    });

    const onFilter = () => {
        runWhenConnected(() => {
            router.push("/(tabs)/(home)/(search)/filter");
        });
    };

    const onSearchFocus = () => {
        runWhenConnected(() => {
            router.push("/(tabs)/(home)/(search)/search");
        });
    };

    const onCarPress = (car: APIGetCarResult) => {
        runWhenConnected(() => {
            router.push(`/cars/${car.id}`);
        });
    };

    const onBrandPress = (brand: CarBrand) => {
        runWhenConnected(() => {
            router.push({
                pathname: "/(tabs)/(home)/(search)/results",
                params: createParamsFromFilters({ brands: [brand] })
            });
        });
    };

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
            {isConnected
                ? <SearchWithFilter onFilter={onFilter} onFocus={onSearchFocus} />
                : <NetworkWarningBox style={styles.networkWarning} />
            }
            <FlatList
                data={cars}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AvailableCarCard car={item} onPress={() => onCarPress(item)} />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={(
                    <ErrorBox message="We couldn't find any cars." />
                )}
                ListHeaderComponent={(
                    <>
                        <ThemedText variant="headingMedium" style={styles.heading}>Top Brands</ThemedText>
                        <View style={styles.brandsContainer}>
                            <TopBrandCard image="bmw" onPress={() => onBrandPress("BMW")} />
                            <TopBrandCard image="mercedes" onPress={() => onBrandPress("Mercedes-Benz")} />
                            <TopBrandCard image="nissan" onPress={() => onBrandPress("Nissan")} />
                            <TopBrandCard image="toyota" onPress={() => onBrandPress("Toyota")} />
                        </View>
                        <ThemedText variant="headingMedium" style={styles.heading}>Available Cars</ThemedText>
                    </>
                )}
                refreshing={isLoading}
                onRefresh={refresh}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    brandsContainer: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 15
    },
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
        paddingBottom: 25
    },
    heading: {
        marginBottom: 10
    },
    networkWarning: {
        marginBottom: 24
    },
    separator: {
        height: 15
    }
});
