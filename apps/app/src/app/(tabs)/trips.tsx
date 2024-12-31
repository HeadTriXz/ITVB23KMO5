import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TripsScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Trips</ThemedText>
            <ThemedText>Your upcoming and past trips will be listed here.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 10 },
});
