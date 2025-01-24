import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { NavigateButton } from "@/components/common/buttons";
import { NetworkWarningBox } from "@/components/common";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useTheme } from "@/hooks/useTheme";

export default function SupportScreen() {
    const { isConnected } = useNetworkStatus();
    const theme = useTheme();

    return (
        <ThemedView style={styles.container}>
            <Header title="Support" />
            {isConnected ? null : <NetworkWarningBox />}
            <View style={styles.heading}>
                <SolarBoldDuotone name="dialog" size={100} color={theme.colors.textPrimary} />
                <ThemedText variant="headingLarge" style={styles.headingText}>
                    How can we help you?
                </ThemedText>
            </View>
            <View style={styles.buttonContainer}>
                <NavigateButton destination="/(tabs)/support/chat" icon="dialog" disabled={!isConnected}>
                    Contact Live Chat
                </NavigateButton>
                <NavigateButton destination="/(tabs)/support/damage" icon="sledgehammer" disabled={!isConnected}>
                    Report Damage
                </NavigateButton>
                <NavigateButton destination="/(tabs)/support/faq" icon="question-circle">
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
        padding: 16,
        paddingBottom: 94
    },
    heading: {
        alignItems: "center",
        marginTop: 16
    },
    headingText: {
        maxWidth: "80%",
        textAlign: "center"
    }
});
