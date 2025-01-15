import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity } from "react-native";

import { SolarBoldDuotone } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { useTheme } from "@/hooks/useTheme";

interface SelectableButtonProps {
    children: ReactNode;
    icon: string;
    onPress: () => void;
    selected: boolean;
}

export function SelectableButton({ children, icon, onPress, selected }: SelectableButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    if (typeof children === "string") {
        children = <ThemedText style={styles.text}>{children}</ThemedText>;
    }

    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.active]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <SolarBoldDuotone name={icon} size={24} color={theme.colors.textPrimary} />
            {children}
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    active: {
        borderColor: theme.colors.accent,
        boxShadow: `0 0 0 1px ${theme.colors.accent}`
    },
    container: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 28,
        paddingVertical: 20
    },
    text: {
        fontFamily: theme.fonts.headingMedium.fontFamily
    }
});
