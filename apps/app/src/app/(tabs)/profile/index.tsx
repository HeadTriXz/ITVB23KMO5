import { ThemedText, ThemedView } from "@/components/base";
import { StyleSheet } from "react-native";

export default function ProfileScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Profile</ThemedText>
            <ThemedText>Manage your personal details here.</ThemedText>
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
