import { View, Text, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function SupportScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Support</ThemedText>
            <ThemedText>Have questions or issues? Reach out here.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 10 },
});
