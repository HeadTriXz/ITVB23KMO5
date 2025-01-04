import type { Theme } from "@/types/theme";

import { StyleSheet } from "react-native";
import { Header } from "@/components/header/Header";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { useTheme } from "@/hooks/useTheme";

export default function NotificationsScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <ThemedView style={styles.container}>
            <Header title="Notifications" withBackButton />
            <ThemedText>Notification 1</ThemedText>
            <ThemedText>Notification 2</ThemedText>
            <ThemedText>Notification 3</ThemedText>
            <ThemedText>Notification 4</ThemedText>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 76
    }
});
