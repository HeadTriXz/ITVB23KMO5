import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "@/components/input/SearchBar";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface SearchWithFilterProps {
    autoFocus?: boolean;
    onChange?: (query: string) => void;
    onFilter: () => void;
    onFocus?: () => void;
    onSearch?: (query: string) => void;
    value?: string;
}

export function SearchWithFilter({ autoFocus, onChange, onFilter, onFocus, onSearch, value }: SearchWithFilterProps) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <SearchBar
                autoFocus={autoFocus}
                onChange={onChange}
                onFocus={onFocus}
                onSearch={onSearch}
                placeholder="Search"
                style={styles.searchBar}
                value={value}
            />
            <SecondaryButton onPress={onFilter} style={styles.filterButton}>
                <Ionicons name="options" size={20} color={theme.colors.textSecondary} />
            </SecondaryButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 24
    },
    searchBar: {
        flex: 1,
        width: undefined
    },
    filterButton: {
        marginLeft: 10,
        width: undefined
    }
});

