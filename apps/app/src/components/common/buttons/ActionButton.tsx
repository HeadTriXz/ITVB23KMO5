import { type ViewStyle, StyleSheet, TouchableOpacity, View } from "react-native";
import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { Ionicons } from "@expo/vector-icons";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { useTheme } from "@/hooks/useTheme";

interface ActionButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onPress?: () => void;
    icon?: string;
    subtitle?: string;
    style?: ViewStyle;
}

export function ActionButton({ children, disabled, onPress, icon, subtitle, style }: ActionButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    if (typeof children === "string") {
        children = (
            <ThemedText style={[styles.text, disabled && styles.disabledText]}>
                {children}
            </ThemedText>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {icon && (
                    <SolarBoldDuotone
                        name={icon}
                        size={24}
                        color={disabled ? theme.colors.textSecondary : theme.colors.textPrimary}
                    />
                )}
                {children}
            </View>
            <View style={styles.content}>
                {subtitle && <ThemedText style={styles.secondaryText}>{subtitle}</ThemedText>}
                <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 28,
        paddingVertical: 20
    },
    content: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15
    },
    disabled: {
        backgroundColor: theme.colors.buttonDisabled
    },
    disabledText: {
        color: theme.colors.textSecondary
    },
    secondaryText: {
        color: theme.colors.textSecondary,
        fontSize: 14
    },
    text: {
        fontFamily: theme.fonts.headingMedium.fontFamily
    }
});
