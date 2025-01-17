import { ThemedText, ThemedView } from "@/components/base";
import { SecondaryButton } from "@/components/common/buttons";
import { StyleSheet, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/header";

export default function ProfileScreen() {
    const { setToken } = useAuth();

    const onSignOut = () => {
        setToken(null);
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Profile" />
            <View style={styles.contentContainer}>
                <View>
                    <ThemedText variant="headingMedium">Profile</ThemedText>
                    <ThemedText>Manage your personal details here.</ThemedText>
                </View>
                <SecondaryButton onPress={onSignOut}>Sign Out</SecondaryButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between"
    }
});
