import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/base/ThemedView";
import { ThemedText } from "@/components/base/ThemedText";

export default function FavoritesScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText variant="headingMedium">Favorites</ThemedText>
            <ThemedText>Your favorite cars will appear here.</ThemedText>
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
