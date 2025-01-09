import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { BookingHeader } from "@/components/BookingHeader";
import { ErrorBox } from "@/components/ErrorBox";
import { Header } from "@/components/layout/header/Header";
import { Image } from "expo-image";
import { LocationPreview } from "@/components/maps/LocationPreview";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ThemedText } from "@/components/base/ThemedText";
import { ThemedView } from "@/components/base/ThemedView";
import { prettyFuel } from "@/utils/car";
import { useAPI } from "@/hooks/useAPI";
import { useTheme } from "@/hooks/useTheme";

interface CarDetailsProps {
    id: string;
    onBook: () => void;
}

export function AvailableCarDetails({ id, onBook }: CarDetailsProps) {
    const { api } = useAPI();
    const theme = useTheme();
    const styles = useStyles(theme);

    const [car, setCar] = useState<APIGetCarResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        api.getCar(Number(id))
            .then(setCar)
            .catch(() => setError("Failed to fetch car details."))
            .finally(() => setIsLoading(false));
    }, []);

    if (error) {
        return (
            <ThemedView style={[styles.screenContainer, styles.contentContainer]}>
                <Header withBackButton />
                <ErrorBox message={error} />
            </ThemedView>
        );
    }

    if (isLoading || !car) {
        return (
            <ThemedView style={[styles.screenContainer, styles.contentContainer]}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <BookingHeader car={car} />
                <Image source={`data:image/png;base64,${car.picture}`} style={styles.image} />
            </View>
            <ThemedView style={styles.detailsSection}>
                <View>
                    <View style={styles.specificationsRow}>
                        <View style={styles.specificationItem}>
                            <ThemedText style={styles.specificationText}>{car.modelYear}</ThemedText>
                            <ThemedText variant="textSmall" style={styles.secondaryText}>Year</ThemedText>
                        </View>
                        <View style={[styles.specificationItem, styles.specificationsDivider]}>
                            <ThemedText style={styles.specificationText}>{prettyFuel(car.fuel)}</ThemedText>
                            <ThemedText variant="textSmall" style={styles.secondaryText}>Fuel</ThemedText>
                        </View>
                        <View style={styles.specificationItem}>
                            <ThemedText style={styles.specificationText}>{car.nrOfSeats} seats</ThemedText>
                            <ThemedText variant="textSmall" style={styles.secondaryText}>Capacity</ThemedText>
                        </View>
                    </View>
                    <LocationPreview latitude={car.latitude} longitude={car.longitude} />
                </View>
                <View style={styles.pricingRow}>
                    <View style={styles.pricingContainer}>
                        <ThemedText variant="headingMedium" style={styles.pricingText}>€{car.price}</ThemedText>
                        <ThemedText>/day</ThemedText>
                    </View>
                    <PrimaryButton onPress={onBook} style={styles.bookButton}>Book Now</PrimaryButton>
                </View>
            </ThemedView>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    bookButton: {
        width: "50%"
    },
    contentContainer: {
        padding: 24
    },
    detailsSection: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        justifyContent: "space-between",
        padding: 24,
        paddingBottom: 100
    },
    image: {
        aspectRatio: 16 / 9,
        borderRadius: 10,
        width: "100%"
    },
    pricingContainer: {
        alignItems: "flex-end"
    },
    pricingRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pricingText: {
        lineHeight: 20
    },
    screenContainer: {
        backgroundColor: theme.colors.card,
        flex: 1
    },
    secondaryText: {
        color: theme.colors.textSecondary
    },
    specificationItem: {
        alignItems: "center",
        flex: 1
    },
    specificationText: {
        fontSize: 20
    },
    specificationsDivider: {
        borderColor: theme.colors.border,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    specificationsRow: {
        flexDirection: "row",
        marginBottom: 40,
        marginTop: 16
    }
});
