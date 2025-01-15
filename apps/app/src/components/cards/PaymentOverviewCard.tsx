import type { Rental } from "@/data/local/schema";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ErrorBox } from "@/components/common";
import { Image } from "expo-image";
import { SolarOutline } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { humanReadableDate } from "@/utils/dates";
import { useEndRental } from "@/hooks/useEndRental";
import { useGeocodedLocation } from "@/hooks/useGeocodedLocation";
import { useTheme } from "@/hooks/useTheme";
import { VisaIcon } from "@/components/icons/VisaIcon";

interface PaymentOverviewCardProps {
    rental: Rental;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function PaymentOverviewCard({ rental }: PaymentOverviewCardProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { data } = useEndRental();
    if (!data.location) {
        return <ErrorBox message="No location data provided" />;
    }

    const { error, isLoading, location } = useGeocodedLocation(data.location.latitude, data.location.longitude);
    if (error) {
        return <ErrorBox message={error} />;
    }

    if (isLoading || !location) {
        return <ActivityIndicator />;
    }

    const fromDate = new Date(rental.fromDate).getTime();
    const toDate = new Date(rental.toDate).getTime();

    const days = Math.ceil((toDate - fromDate) / MS_PER_DAY) + 1;

    return (
        <View style={styles.card}>
            <Image source={{ uri: `data:image/png;base64,${rental.car.picture}` }} style={styles.image} />
            <View style={styles.contentContainer}>
                <View style={styles.informationRow}>
                    <SolarOutline name="calendar" size={24} color={theme.colors.textPrimary} />
                    <ThemedText>
                        {humanReadableDate(rental.fromDate)} - {humanReadableDate(rental.toDate)}
                    </ThemedText>
                </View>
                <View style={styles.informationRow}>
                    <SolarOutline name="map-point" size={24} color={theme.colors.textPrimary} />
                    <ThemedText>{location.formattedAddress}</ThemedText>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <ThemedText style={[styles.heading, styles.secondaryText]}>Payment Method</ThemedText>
                <View style={styles.row}>
                    <VisaIcon height={15} width={48} fill={theme.colors.textPrimary} />
                    <ThemedText style={styles.heading}>••••  ••••  ••••  1234</ThemedText>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.row}>
                    <ThemedText style={[styles.heading, styles.secondaryText]}>Total</ThemedText>
                    <ThemedText style={styles.heading}>€{days * rental.car.price}</ThemedText>
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
    heading: {
        fontFamily: theme.fonts.headingMedium.fontFamily
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
    row: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    secondaryText: {
        color: theme.colors.textSecondary
    }
});
