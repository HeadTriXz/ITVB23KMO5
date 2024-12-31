import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ProfileScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Profile</ThemedText>
            <ThemedText>Manage your personal details here.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 10 },
});
