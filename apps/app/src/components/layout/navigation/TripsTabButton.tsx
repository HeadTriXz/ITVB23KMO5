import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/base";
import { useTheme } from "@/hooks/useTheme";

export enum TripsTab {
    Active = "Active",
    Upcoming = "Upcoming",
    Completed = "Completed"
}

interface TripTabButtonProps {
    isSelected: boolean;
    onPress: (tab: TripsTab) => void;
    tab: TripsTab;
}

export function TripsTabButton({ isSelected, onPress, tab }: TripTabButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <TouchableOpacity style={styles.tab} onPress={() => onPress(tab)}>
            <ThemedText style={[styles.tabText, isSelected && styles.selectedTabText]}>
                {tab}
            </ThemedText>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    selectedTabText: {
        backgroundColor: theme.colors.buttonPrimary,
        borderRadius: 7,
        color: theme.colors.card
    },
    tab: {
        flex: 1
    },
    tabText: {
        color: theme.colors.textPrimary,
        padding: 13,
        textAlign: "center"
    }
});
