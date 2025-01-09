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
        height: 20,
        left: 31,
        position: "absolute",
        top: 30,
        width: 20
    },
    markerDot: {
        backgroundColor: "#FFFFFF",
        borderRadius: 4,
        height: 8,
        left: 4,
        position: "absolute",
        top: 4,
        width: 8
    },
    markerPin: {
        backgroundColor: theme.colors.accent,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 2,
        height: 20,
        width: 20
    },
    markerShadow: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 7,
        bottom: -2,
        height: 3,
        position: "absolute",
        width: 14
    }
});
