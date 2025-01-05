import type { APIGetCarResult } from "@/types/api";

import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { AvailableCarCard } from "@/components/AvailableCarCard";
import { Header } from "@/components/header/Header";
import { SearchWithFilter } from "@/components/SearchWithFilter";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
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
        router.push("/filter");
    }, []);

    const onCarPress = useCallback((car: APIGetCarResult) => {
        console.log(`Car pressed: ${car.id}`);
    }, []);

    const onSearchFocus = useCallback(() => {
        router.push("/search");
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
                contentContainerStyle={{ gap: 15, paddingBottom: 25 }}
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
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 76
    },
    centered: {
        alignItems: "center",
        justifyContent: "center"
    },
    heading: {
        marginBottom: 10
    }
});
