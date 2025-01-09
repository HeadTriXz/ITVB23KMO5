import type { Theme } from "@/types/theme";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export function MapMarker() {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.markerContainer}>
            <View style={styles.markerPin}>
                <View style={styles.markerDot} />
            </View>
            <View style={styles.markerShadow} />
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    markerContainer: {
        alignItems: "center",
        position: "absolute",
        left: 31,
        top: 30,
        width: 20,
        height: 20
    },
    markerPin: {
        backgroundColor: theme.colors.accent,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 2,
        width: 20,
        height: 20
    },
    markerDot: {
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        position: "absolute",
        left: 4,
        top: 4,
        width: 8,
        height: 8
    },
    markerShadow: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 7,
        position: "absolute",
        bottom: -2,
        width: 14,
        height: 3
    }
});
