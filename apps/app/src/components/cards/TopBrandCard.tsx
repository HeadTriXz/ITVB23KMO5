import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useTheme";

interface TopBrandCardProps {
    image: string;
    onPress: () => void;
}

export function TopBrandCard({ image, onPress }: TopBrandCardProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    if (theme.dark) {
        image = `${image}-dark`;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={image} style={styles.image} contentFit="contain" />
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        aspectRatio: 1,
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        padding: 15
    },
    image: {
        height: "100%",
        width: "100%"
    }
});
