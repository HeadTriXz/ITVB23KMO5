import type { Notification } from "@/data/local/schema";
import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/base";
import { getTimeAgo } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";
import { SolarOutline } from "@/components/icons/solar";

interface NotificationItemProps {
    notification: Notification;
    onPress: (notification: Notification) => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <TouchableOpacity
            onPress={() => onPress(notification)}
            style={styles.container}
            activeOpacity={0.7}
        >
            <SolarOutline name="bell" size={24} color={theme.colors.textSecondary} style={styles.icon} />
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <ThemedText style={styles.title} numberOfLines={1}>
                        {notification.title}
                    </ThemedText>
                    <View style={styles.time}>
                        {!notification.isRead && <View style={styles.indicator} />}
                        <ThemedText style={styles.timeText}>
                            {getTimeAgo(notification.createdAt)}
                        </ThemedText>
                    </View>
                </View>
                <ThemedText>
                    {notification.body}
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        gap: 24,
        paddingHorizontal: 24,
        paddingVertical: 20
    },
    contentContainer: {
        flex: 1
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        justifyContent: "space-between",
        marginBottom: 5
    },
    icon: {
        borderColor: theme.colors.border,
        borderRadius: 100,
        borderWidth: 1,
        padding: 6
    },
    indicator: {
        backgroundColor: theme.colors.accent,
        borderRadius: 4,
        height: 8,
        width: 8
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        gap: 8
    },
    timeText: {
        color: theme.colors.textSecondary
    },
    title: {
        flex: 1,
        fontFamily: theme.fonts.headingMedium.fontFamily,
        fontSize: 16
    }
});
