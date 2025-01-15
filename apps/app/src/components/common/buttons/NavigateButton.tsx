import { type Href, useRouter } from "expo-router";
import { type ViewStyle, StyleSheet, TouchableOpacity, View } from "react-native";
import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { Ionicons } from "@expo/vector-icons";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { useTheme } from "@/hooks/useTheme";

interface NavigateButtonProps {
    children: ReactNode;
    destination: Href;
    icon: string;
    style?: ViewStyle;
}

export function NavigateButton({ children, destination, icon, style }: NavigateButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const onPress = () => {
        router.push(destination);
    }

    if (typeof children === "string") {
        children = <ThemedText style={styles.text}>{children}</ThemedText>;
    }

    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.content}>
                <SolarBoldDuotone name={icon} size={24} color={theme.colors.textPrimary} />
                {children}
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.textSecondary} />
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
    text: {
        fontFamily: theme.fonts.headingMedium.fontFamily
    }
});
