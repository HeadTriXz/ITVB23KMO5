import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ErrorBox } from "@/components/common";
import { Image } from "expo-image";
import { SolarOutline } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { humanReadableDate } from "@/utils/dates";
import { useGeocodedLocation } from "@/hooks/useGeocodedLocation";
import { useTheme } from "@/hooks/useTheme";

interface BookingOverviewCardProps {
    car: APIGetCarResult;
    fromDate: string;
    toDate: string;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function BookingOverviewCard({ car, fromDate, toDate }: BookingOverviewCardProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const days = Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / MS_PER_DAY) + 1;

    const { error, isLoading, location } = useGeocodedLocation(car.latitude, car.longitude);
    if (error) {
        return <ErrorBox message={error} />;
    }

    if (isLoading || !location) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.card}>
            <Image source={{ uri: `data:image/png;base64,${car.picture}` }} style={styles.image} />
            <View style={styles.contentContainer}>
                <View style={styles.informationRow}>
                    <SolarOutline name="calendar" size={24} />
                    <ThemedText>
                        {humanReadableDate(fromDate)} - {humanReadableDate(toDate)}
                    </ThemedText>
                </View>
                <View style={styles.informationRow}>
                    <SolarOutline name="map-point" size={24} />
                    <ThemedText>{location.formattedAddress}</ThemedText>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.pricingRow}>
                    <ThemedText style={styles.secondaryText}>Rented Days</ThemedText>
                    <ThemedText style={styles.priceText}>{days}x €{car.price}</ThemedText>
                </View>
                <View style={styles.pricingRow}>
                    <ThemedText style={styles.secondaryText}>Unlimited Miles</ThemedText>
                    <ThemedText style={styles.priceText}>FREE</ThemedText>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.pricingRow}>
                    <ThemedText style={[styles.priceText, styles.secondaryText]}>Total</ThemedText>
                    <ThemedText style={styles.priceText}>€{days * car.price}</ThemedText>
                </View>
            </View>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1
    },
    contentContainer: {
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        gap: 10,
        padding: 24
    },
    image: {
        aspectRatio: 16 / 9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%"
    },
    informationRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    priceText: {
        fontFamily: theme.fonts.headingMedium.fontFamily
    },
    pricingRow: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    secondaryText: {
        color: theme.colors.textSecondary
    }
});
