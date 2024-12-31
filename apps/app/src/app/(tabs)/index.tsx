import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
    const { setToken } = useAuth();

    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Home</ThemedText>
            <ThemedText>Welcome to the car rental app!</ThemedText>
            <PrimaryButton onPress={() => setToken(null)}>Logout [DEBUG]</PrimaryButton>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    }
});
