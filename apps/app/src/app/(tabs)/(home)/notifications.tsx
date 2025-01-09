import { StyleSheet } from "react-native";
import { Header } from "@/components/layout/header/Header";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";

export default function NotificationsScreen() {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 76
    }
});
