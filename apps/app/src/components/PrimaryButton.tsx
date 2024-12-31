import {
    type ViewStyle,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { useTheme } from "@/hooks/useTheme";
import { ThemedText } from "@/components/ThemedText";

export interface BaseButtonProps {
    children: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
    style?: ViewStyle;
}

export function PrimaryButton({ children, disabled, loading, onPress, style }: BaseButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    if (typeof children === "string") {
        children = <ThemedText variant="textBody" style={styles.text}>{children}</ThemedText>;
    }

    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? <ActivityIndicator color={theme.colors.background} /> : children}
        </TouchableOpacity>
    )
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.buttonPrimary,
        borderRadius: 7,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 13,
        width: "100%"
    },
    disabled: {
        backgroundColor: theme.colors.buttonDisabled
    },
    text: {
        color: theme.colors.background,
        flexGrow: 1,
        textAlign: "center"
    }
});
