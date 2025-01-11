import type { APIGetCarResult } from "@/types/api";

import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { AvailableCarCard } from "@/components/cards/AvailableCarCard";
import { Header } from "@/components/layout/header";
import { SearchWithFilter } from "@/components/common/forms";
import { useCallback } from "react";
import { useCarSearch } from "@/hooks/useCarSearch";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();
    const search = useCarSearch({
        filters: {},
        query: "",
        pageSize: 5
    })

    const onFilter = useCallback(() => {
        router.push("/(tabs)/(home)/(search)/filter");
    }, []);

    const onCarPress = useCallback((car: APIGetCarResult) => {
        router.push(`/(tabs)/(home)/(car)/${car.id}`);
    }, []);

    const onSearchFocus = useCallback(() => {
        router.push("/(tabs)/(home)/(search)/search");
    }, []);

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
            <ThemedText variant="headingMedium" style={styles.heading}>Available Cars</ThemedText>
            <FlatList
                data={search.cars}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AvailableCarCard car={item} onPress={() => onCarPress(item)} />
                )}
                refreshing={search.isLoading}
                onRefresh={search.refresh}
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
        padding: 24,
        paddingBottom: 76
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 25
    },
    heading: {
        marginBottom: 10
    }
});
