import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { PrimaryButton } from "@/components/common/buttons";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { useRouter } from "expo-router";

export default function PaymentSuccessScreen() {
    const router = useRouter();
    const onHomePress = () => {
        router.dismissAll();
        router.push("/(tabs)/(home)/");
    };

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <SolarBoldDuotone name="verified-check" size={100} />
                <ThemedText variant="headingLarge" style={styles.heading}>
                    Payment Confirmed
                </ThemedText>
                <ThemedText style={styles.text}>
                    Your payment has been successfully processed.
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
        padding: 24,
        paddingBottom: 100
    },
    text: {
        textAlign: "center"
    }
});
