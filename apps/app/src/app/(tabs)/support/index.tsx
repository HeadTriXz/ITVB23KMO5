import { ThemedText, ThemedView } from "@/components/base";
import { StyleSheet } from "react-native";

export default function SupportScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Support</ThemedText>
            <ThemedText>Have questions or issues? Reach out here.</ThemedText>
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
