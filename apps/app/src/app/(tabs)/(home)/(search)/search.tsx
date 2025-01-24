import type { SearchParams } from "@/types/search";
import type { Theme } from "@/types/theme";

import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Header } from "@/components/layout/header";
import { Ionicons } from "@expo/vector-icons";
import { SearchWithFilter } from "@/components/common/forms";
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
        padding: 16,
        paddingBottom: 68
    },
    recentIcon: {
        borderColor: theme.colors.border,
        borderRadius: 100,
        borderWidth: 1,
        padding: 6
    },
    recentItem: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        paddingVertical: 10
    },
    recentText: {
        color: theme.colors.textSecondary,
        flex: 1
    }
});
