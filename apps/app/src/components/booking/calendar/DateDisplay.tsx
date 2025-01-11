import { type ViewStyle, StyleSheet } from "react-native";
import type { Theme } from "@/types/theme";

import { ThemedText } from "@/components/base";
import { View } from "react-native";
import { humanReadableDate } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";

interface DateDisplayProps {
    fromDate: string | null;
    toDate: string | null;
    style?: ViewStyle;
}

export function DateDisplay({ fromDate, toDate, style }: DateDisplayProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.date}>
                <ThemedText style={styles.dateText}>{humanReadableDate(fromDate)}</ThemedText>
                <ThemedText variant="textSmall" style={styles.secondaryText}>Pick-up Date</ThemedText>
            </View>
            <View style={[styles.date, styles.divider]}>
                <ThemedText style={styles.dateText}>{humanReadableDate(toDate)}</ThemedText>
                <ThemedText variant="textSmall" style={styles.secondaryText}>Return Date</ThemedText>
            </View>
        </View>
    )
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    date: {
        alignItems: "center",
        flex: 1
    },
    dateText: {
        fontSize: 20
    },
    divider: {
        borderLeftColor: theme.colors.border,
        borderLeftWidth: 1
    },
    secondaryText: {
        color: theme.colors.textSecondary
    }
});
