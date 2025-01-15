import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { PrimaryButton } from "@/components/common/buttons";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function ReportDamageSuccessScreen() {
    const theme = useTheme();
    const router = useRouter();

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <SolarBoldDuotone name="verified-check" size={100} color={theme.colors.textPrimary} />
                <ThemedText variant="headingLarge" style={styles.heading}>
                    Damage Reported
                </ThemedText>
                <ThemedText style={styles.text}>
                    Your damage report has been successfully submitted.
                </ThemedText>
            </View>
            <PrimaryButton onPress={() => router.back()}>
                Go Back
            </PrimaryButton>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    heading: {
        marginBottom: 10,
        marginTop: 30
    },
    screenContainer: {
        flex: 1,
        justifyContent: "space-between",
        padding: 24,
        paddingBottom: 100
    },
    text: {
        textAlign: "center"
    }
});
