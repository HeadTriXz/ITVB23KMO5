import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { BackButton, FavoriteButton } from "@/components/layout/header";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/base";
import { View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface BookingHeaderProps {
    car: APIGetCarResult;
}

export function BookingHeader({ car }: BookingHeaderProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <BackButton />
            <View style={styles.content}>
                <ThemedText variant="headingMedium">{car.brand}</ThemedText>
                <ThemedText style={styles.secondaryText}>{car.model}</ThemedText>
            </View>
            <FavoriteButton id={car.id} />
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24
    },
    content: {
        alignItems: "center"
    },
    secondaryText: {
        color: theme.colors.textSecondary
    }
});
