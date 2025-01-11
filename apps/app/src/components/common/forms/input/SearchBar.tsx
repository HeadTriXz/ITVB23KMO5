import { type ViewStyle, StyleSheet, TextInput, View } from "react-native";
import type { Theme } from "@/types/theme";

import { SolarOutline } from "@/components/icons/solar/SolarOutline";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface SearchBarProps {
    autoFocus?: boolean;
    onChange?: (query: string) => void;
    onFocus?: () => void;
    onSearch?: (query: string) => void;
    placeholder: string;
    style?: ViewStyle;
    value?: string;
}

export function SearchBar({ autoFocus, onChange, onFocus, onSearch, placeholder, style, value }: SearchBarProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [internalQuery, setInternalQuery] = useState("");

    const query = value ?? internalQuery;
    const setQuery = (query: string) => {
        setInternalQuery(query);
        onChange?.(query);
    }

    return (
        <View style={[styles.container, style]}>
            <SolarOutline name="magnifer" size={20} style={styles.icon} />
            <TextInput
                style={[theme.fonts.textBody, styles.input]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => onSearch?.(query)}
                onFocus={onFocus}
                autoFocus={autoFocus}
            />
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 13,
        width: "100%"
    },
    icon: {
        color: theme.colors.textSecondary,
        marginRight: 15
    },
    input: {
        color: theme.colors.textPrimary,
        flex: 1
    }
});
