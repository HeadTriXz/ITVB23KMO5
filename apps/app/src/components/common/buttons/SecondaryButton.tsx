import {
    type ViewStyle,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { ThemedText } from "@/components/base/ThemedText";
import { useTheme } from "@/hooks/useTheme";

export interface BaseButtonProps {
    children: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

export function SecondaryButton({ children, disabled, loading, onPress, style }: BaseButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    if (typeof children === "string") {
        children = (
            <ThemedText variant="textBody" style={[styles.text, disabled && styles.disabledText]}>
                {children}
            </ThemedText>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled, loading && styles.loading, style]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? <ActivityIndicator color={theme.colors.textPrimary} /> : children}
        </TouchableOpacity>
    )
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: "row",
        height: 52,
        paddingHorizontal: 20,
        width: "100%"
    },
    disabled: {
        backgroundColor: theme.colors.buttonDisabled
    },
    disabledText: {
        color: theme.colors.textSecondary
    },
    loading: {
        justifyContent: "center"
    },
    text: {
        color: theme.colors.textPrimary,
        flexGrow: 1,
        textAlign: "center"
    }
});
