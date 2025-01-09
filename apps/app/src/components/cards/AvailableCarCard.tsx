import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/base/ThemedText";
import { prettyFuel } from "@/utils/car";
import { useTheme } from "@/hooks/useTheme";

interface ListItemProps {
    car: APIGetCarResult;
    onPress: () => void;
}

export function AvailableCarCard({ car, onPress }: ListItemProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Image source={{ uri: `data:image/png;base64,${car.picture}` }} style={styles.image} />
            <View style={styles.mainInfo}>
                <View style={styles.header}>
                    <ThemedText variant="headingSmall">{car.brand}</ThemedText>
                    <View style={styles.pricing}>
                        <ThemedText variant="headingSmall">€{car.price}</ThemedText>
                        <ThemedText>/day</ThemedText>
                    </View>
                </View>
                <ThemedText style={styles.textSecondary}>{car.model}</ThemedText>
            </View>
            <View style={styles.specifications}>
                <ThemedText style={styles.textSecondary}>{prettyFuel(car.fuel)}</ThemedText>
                <ThemedText style={styles.textSecondary}>•</ThemedText>
                <ThemedText style={styles.textSecondary}>{car.modelYear}</ThemedText>
                <ThemedText style={styles.textSecondary}>•</ThemedText>
                <ThemedText style={styles.textSecondary}>{car.nrOfSeats} seats</ThemedText>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        aspectRatio: 16 / 9,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%"
    },
    mainInfo: {
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        padding: 24
    },
    pricing: {
        flexDirection: "row",
    },
    specifications: {
        borderColor: theme.colors.border,
        borderTopWidth: 1,
        flexDirection: "row",
        gap: 10,
        padding: 24
    },
    textSecondary: {
        color: theme.colors.textSecondary
    }
});
