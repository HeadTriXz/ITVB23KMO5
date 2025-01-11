import type { APIGetCarResult } from "@/types/api";
import type { SearchParams } from "@/types/search";

import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AvailableCarCard } from "@/components/cards/AvailableCarCard";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { SearchWithFilter } from "@/components/common/forms";
import { ThemedView } from "@/components/base";
import { parseFiltersFromParams } from "@/utils/filterParams";
import { useCallback } from "react";
import { useCarSearch } from "@/hooks/useCarSearch";

export default function SearchResultsScreen() {
    const params = useLocalSearchParams<SearchParams>();
    const filters = parseFiltersFromParams(params);
    const router = useRouter();

    const search = useCarSearch({
        filters: filters,
        query: params.query,
        pageSize: 20
    })

    const onSearchFocus = useCallback(() => {
        router.push({ pathname: "/search", params: params });
    }, []);

    const onFilter = useCallback(() => {
        router.push({ pathname: "/filter", params: params });
    }, []);

    const onCarPress = useCallback((car: APIGetCarResult) => {
        router.push(`/(tabs)/(home)/(car)/${car.id}`);
    }, []);

    const renderFooter = () => {
        if (search.isLoading) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                </View>
            );
        }

        return null;
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Search" dismissAll withBackButton withNotificationsButton />
            <SearchWithFilter onFilter={onFilter} onFocus={onSearchFocus} value={params.query} />
            <FlatList
                data={search.cars}
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AvailableCarCard car={item} onPress={() => onCarPress(item)} />
                )}
                onEndReached={search.loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={search.isLoading
                    ? <ActivityIndicator />
                    : <ErrorBox message={search.error || "Could not find any cars"} />
                }
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
    contentContainer: {
        gap: 15,
        paddingBottom: 25
    },
    footer: {
        paddingVertical: 15
    }
});
