import type { SearchParams } from "@/types/search";
import type { Theme } from "@/types/theme";

import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Header } from "@/components/layout/header/Header";
import { Ionicons } from "@expo/vector-icons";
import { SearchWithFilter } from "@/components/SearchWithFilter";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useTheme } from "@/hooks/useTheme";

export default function SearchScreen() {
    const router = useRouter();
    const {
        addRecentSearch,
        isLoading,
        recentSearches
    } = useRecentSearches();

    const theme = useTheme();
    const styles = useStyles(theme);
    const params = useLocalSearchParams<SearchParams>();

    const [query, setQuery] = useState(params.query || "");

    const validateSearch = (query: string): string | null => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery || trimmedQuery.length === 0) {
            return null;
        }

        return trimmedQuery;
    };

    const onSearch = useCallback(async (query: string) => {
        const validQuery = validateSearch(query);
        if (!validQuery) {
            return;
        }

        await addRecentSearch(validQuery);

        params.query = validQuery;
        router.replace({ pathname: "/results", params: params });
    }, [addRecentSearch]);

    const onFilter = useCallback(() => {
        router.replace({ pathname: "/filter", params: params });
    }, []);

    return (
        <ThemedView style={styles.container}>
            <Header title="Search" withBackButton withNotificationsButton />
            <SearchWithFilter
                onChange={setQuery}
                onSearch={onSearch}
                onFilter={onFilter}
                value={query}
                autoFocus
            />
            {!isLoading && recentSearches.length > 0 && (
                <View>
                    <ThemedText variant="headingMedium">Recent Searches</ThemedText>
                    <FlatList
                        data={recentSearches}
                        keyExtractor={(item) => item.query}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.recentItem}
                                onPress={() => onSearch(item.query)}
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={24}
                                    color={theme.colors.textSecondary}
                                    style={styles.recentIcon}
                                />
                                <ThemedText style={styles.recentText}>
                                    {item.query}
                                </ThemedText>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 76
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 12
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 15
    },
    recentIcon: {
        padding: 6,
        borderRadius: 100,
        borderColor: theme.colors.border,
        borderWidth: 1
    },
    recentText: {
        color: theme.colors.textSecondary,
        flex: 1
    }
});
