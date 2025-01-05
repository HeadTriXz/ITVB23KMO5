import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 5;

interface RecentSearch {
    query: string;
    timestamp: number;
}

export function useRecentSearches() {
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadRecentSearches();
    }, []);

    const loadRecentSearches = async () => {
        try {
            const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
            if (stored) {
                setRecentSearches(JSON.parse(stored));
            }
        } catch (error) {
            console.error("Failed to load recent searches:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addRecentSearch = useCallback(async (query: string) => {
        try {
            const newSearch = { query, timestamp: Date.now() };
            const newSearches = [
                newSearch,
                ...recentSearches.filter(s => s.query !== query)
            ].slice(0, MAX_RECENT_SEARCHES);

            await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
            setRecentSearches(newSearches);
        } catch (error) {
            console.error("Failed to save recent search:", error);
        }
    }, [recentSearches]);

    const clearRecentSearches = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
            setRecentSearches([]);
        } catch (error) {
            console.error("Failed to clear recent searches:", error);
        }
    }, []);

    return {
        addRecentSearch,
        clearRecentSearches,
        isLoading,
        recentSearches
    };
}
