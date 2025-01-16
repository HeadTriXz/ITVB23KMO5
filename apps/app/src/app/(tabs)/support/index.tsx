import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { NavigateButton } from "@/components/common/buttons/NavigateButton";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { useTheme } from "@/hooks/useTheme";

export default function SupportScreen() {
    const theme = useTheme();

    return (
        <ThemedView style={styles.container}>
            <Header title="Support" />
            <View style={styles.heading}>
                <SolarBoldDuotone name="dialog" size={100} color={theme.colors.textPrimary} />
                <ThemedText variant="headingLarge" style={styles.headingText}>
                    How can we help you?
                </ThemedText>
            </View>
            <View style={styles.buttonContainer}>
                <NavigateButton destination="/(tabs)/support/chat" icon="dialog">
                    Contact Live Chat
                </NavigateButton>
                <NavigateButton destination="/(tabs)/support/damage" icon="sledgehammer">
                    Report Damage
                </NavigateButton>
                <NavigateButton destination="/" icon="question-circle">
                    Frequently Asked
                </NavigateButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        gap: 15,
        marginTop: 40
    },
    container: {
        flex: 1,
        paddingBottom: 100,
        paddingHorizontal: 24,
        paddingTop: 40
    },
    heading: {
        alignItems: "center"
    },
    headingText: {
        maxWidth: "80%",
        textAlign: "center"
    }
});
