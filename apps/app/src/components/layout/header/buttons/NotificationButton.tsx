import { StyleSheet, TouchableOpacity } from "react-native";

import { SolarOutline } from "@/components/icons/solar/SolarOutline";
import { Theme } from "@/types/theme";
import { ThemedText } from "@/components/base";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { useUnreadNotificationsCount } from "@/hooks/notifications/useUnreadNotificationsCount";

export function NotificationButton() {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const { count } = useUnreadNotificationsCount();

    const onPress = () => {
        router.push("/notifications");
    };

    return (
        <TouchableOpacity onPressOut={onPress}>
            <SolarOutline
                name="bell"
                size={24}
                color={theme.colors.textSecondary}
                style={styles.icon}
            />
            {count ? (
                <ThemedText style={styles.count}>
                    {count > 9 ? "9+" : count}
                </ThemedText>
            ) : null}
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    count: {
        backgroundColor: theme.colors.accent,
        borderRadius: 12,
        color: theme.colors.background,
        fontFamily: theme.fonts.headingMedium.fontFamily,
        fontSize: 12,
        height: 18,
        lineHeight: 18,
        minWidth: 18,
        paddingHorizontal: 4,
        position: "absolute",
        right: -4,
        textAlign: "center",
        top: -4
    },
    icon: {
        borderColor: theme.colors.border,
        borderRadius: 100,
        borderWidth: 1,
        padding: 6
    }
});
