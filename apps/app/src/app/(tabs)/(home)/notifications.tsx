import type { Notification } from "@/data/local/schema";
import type { Theme } from "@/types/theme";

import {
    ActivityIndicator,
    RefreshControl,
    SectionList,
    StyleSheet,
    View
} from "react-native";
import { ErrorBox, WarningBox } from "@/components/common";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { NotificationItem } from "@/components/NotificationItem";
import { isToday } from "@/utils/dates";
import { useMarkNotificationAsRead } from "@/hooks/notifications/useMarkNotificationAsRead";
import { useMemo } from "react";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function NotificationsScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const { error, isLoading, notifications, refresh } = useNotifications();
    const { markAsReadAsync } = useMarkNotificationAsRead();

    const onPress = async (notification: Notification) => {
        if (!notification.isRead) {
            await markAsReadAsync(notification.id);
        }

        router.push(`/(tabs)/trips/${notification.rentalId}`);
    }

    const sections = useMemo(() => {
        if (!notifications) {
            return [];
        }

        const today: Notification[] = [];
        const earlier: Notification[] = [];

        for (const notification of notifications) {
            const date = new Date(notification.createdAt);
            if (isToday(date)) {
                today.push(notification);
            } else {
                earlier.push(notification);
            }
        }

        const result = [];
        if (today.length > 0) {
            result.push({ title: "Today", data: today });
        }

        if (earlier.length > 0) {
            result.push({ title: "Earlier", data: earlier });
        }

        return result;
    }, [notifications]);

    if (error) {
        return (
            <ThemedView style={[styles.container, styles.topPadding]}>
                <Header title="Notifications" withBackButton />
                <ErrorBox message={error.message} />
            </ThemedView>
        );
    }

    if (isLoading) {
        return (
            <ThemedView style={[styles.container, styles.topPadding]}>
                <Header title="Notifications" withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Notifications" withBackButton />
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotificationItem notification={item} onPress={onPress} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <ThemedText variant="headingMedium" style={styles.sectionHeaderText}>
                            {title}
                        </ThemedText>
                    </View>
                )}
                ListEmptyComponent={(
                    <WarningBox
                        message="There are no notifications yet."
                    />
                )}
                refreshControl={(
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refresh}
                    />
                )}
                contentContainerStyle={styles.contentContainer}
            />
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 76,
        paddingHorizontal: 24
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 10,
        paddingTop: 24
    },
    sectionHeader: {
        alignSelf: "center",
        backgroundColor: theme.colors.border,
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 3
    },
    sectionHeaderText: {
        color: theme.colors.textSecondary,
        fontSize: 12,
        textAlign: "center"
    },
    topPadding: {
        paddingTop: 24
    }
});
