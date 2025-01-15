import type { Car, Rental } from "@/data/local/schema";
import type { Theme } from "@/types/theme";

import { OverdueTag, PaidTag, PendingTag } from "@/components/PaymentStatusTag";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Image } from "expo-image";
import { SolarOutline } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { humanReadableDate } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";

interface ListItemProps {
    car: Car;
    rental: Rental;
    onPress: () => void;
}

export function TripCard({ car, rental, onPress }: ListItemProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const renderPaymentStatus = () => {
        if (rental.state === "RESERVED") {
            return null;
        }

        if (rental.state === "RETURNED") {
            return <PaidTag />;
        }

        const endDate = new Date(rental.toDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (endDate < now) {
            return <OverdueTag />;
        }

        return <PendingTag />;
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri: `data:image/png;base64,${car.picture}` }} style={styles.image} />
            <View style={styles.mainInfo}>
                <ThemedText variant="headingSmall">{car.brand}</ThemedText>
                <ThemedText style={styles.textSecondary}>{car.model}</ThemedText>
            </View>
            <View style={styles.informationContainer}>
                <View style={styles.informationRow}>
                    <SolarOutline name="calendar" size={24} color={theme.colors.textPrimary} />
                    <ThemedText>
                        {humanReadableDate(rental.fromDate)} - {humanReadableDate(rental.toDate)}
                    </ThemedText>
                </View>
                {renderPaymentStatus()}
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    card: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1
    },
    image: {
        aspectRatio: 16 / 9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%"
    },
    informationContainer: {
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        gap: 10,
        padding: 24
    },
    informationRow: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    mainInfo: {
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        padding: 24
    },
    textSecondary: {
        color: theme.colors.textSecondary
    }
});
