import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { PrimaryButton } from "@/components/common/buttons";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function BookingSuccessScreen() {
    const theme = useTheme();
    const router = useRouter();

    const onHomePress = () => {
        router.replace("/");
    };

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <SolarBoldDuotone name="verified-check" size={100} color={theme.colors.textPrimary} />
                <ThemedText variant="headingLarge" style={styles.heading}>
                    Booking Confirmed
                </ThemedText>
                <ThemedText style={styles.text}>
                    Your car has been successfully reserved. You can view your booking details in the Trips page.
                </ThemedText>
            </View>
            <PrimaryButton onPress={onHomePress}>Back to Home</PrimaryButton>
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
        padding: 16
    },
    text: {
        textAlign: "center"
    }
});
