import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { Header } from "@/components/layout/header";
import { PrimaryButton } from "@/components/buttons";
import { SolarBoldDuotone } from "@/icons/solar/SolarBoldDuotone";
import { useRouter } from "expo-router";

export function BookingSuccess() {
    const router = useRouter();
    const onHomePress = () => {
        router.dismissAll();
    };

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <SolarBoldDuotone name="verified-check" size={100} />
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
        justifyContent: "center",
        flex: 1
    },
    heading: {
        marginTop: 30,
        marginBottom: 10
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
