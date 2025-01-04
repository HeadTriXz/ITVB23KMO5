import { StyleSheet, TouchableOpacity } from "react-native";

import { SolarOutline } from "@/icons/solar/SolarOutline";
import { Theme } from "@/types/theme";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export function NotificationButton() {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const onPress = useCallback(() => {
        router.push("/notifications");
    }, []);

    return (
        <TouchableOpacity onPress={onPress}>
            <SolarOutline
                name="bell"
                size={24}
                color={theme.colors.textSecondary}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    icon: {
        borderColor: theme.colors.border,
        borderRadius: 100,
        borderWidth: 1,
        padding: 6
    }
});
