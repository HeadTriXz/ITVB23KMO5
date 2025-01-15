import type { APIGetCarResult } from "@/types/api";
import type { CarBrand } from "@/constants/cars";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { AvailableCarCard } from "@/components/cards/AvailableCarCard";
import { Header } from "@/components/layout/header";
import { SearchWithFilter } from "@/components/common/forms";
import { TopBrandCard } from "@/components/cards/TopBrandCard";
import { createParamsFromFilters } from "@/utils/filterParams";
import { useCarSearch } from "@/hooks/useCarSearch";
import { useRouter } from "expo-router";

import React from "react";

export default function HomeScreen() {
    const router = useRouter();
    const search = useCarSearch({
        filters: {},
        query: "",
        pageSize: 5
    })

    const onFilter = () => {
        router.push("/(tabs)/(home)/(search)/filter");
    };

    const onCarPress = (car: APIGetCarResult) => {
        router.push(`/(tabs)/(home)/(car)/${car.id}`);
    };

    const onSearchFocus = () => {
        router.push("/(tabs)/(home)/(search)/search");
    };

    const onBrandPress = (brand: CarBrand) => {
        const params = createParamsFromFilters({ brands: [brand] });
        router.push({
            pathname: "/(tabs)/(home)/(search)/results",
            params: params
        });
    }

    if (search.isLoading) {
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
            <SearchWithFilter onFilter={onFilter} onFocus={onSearchFocus} />
            <FlatList
                data={search.cars}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AvailableCarCard car={item} onPress={() => onCarPress(item)} />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
                refreshing={search.isLoading}
                onRefresh={search.refresh}
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
        padding: 24,
        paddingBottom: 76
    },
    contentContainer: {
        paddingBottom: 25
    },
    heading: {
        marginBottom: 10
    },
    separator: {
        height: 15
    }
});
