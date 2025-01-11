import { ThemedText, ThemedView } from "@/components/base";
import { StyleSheet } from "react-native";

export default function TripsScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Trips</ThemedText>
            <ThemedText>Your upcoming and past trips will be listed here.</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        padding: 24
    }
});
