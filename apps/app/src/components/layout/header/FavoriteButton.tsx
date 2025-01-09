import { StyleSheet, TouchableOpacity } from "react-native";

import { useCallback, useState } from "react";
import { SolarIcon } from "@/icons/solar/SolarIcon";
import { Theme } from "@/types/theme";
import { useTheme } from "@/hooks/useTheme";

interface FavoriteButtonProps {
    id: number;
}

export function FavoriteButton({ id }: FavoriteButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [isFavorite, setIsFavorite] = useState(false);

    const onPress = useCallback(() => {
        console.log(`Toggled favorite for car ${id}`);
        setIsFavorite(!isFavorite);
    }, [isFavorite]);

    return (
        <TouchableOpacity onPress={onPress}>
            <SolarIcon
                name="heart"
                size={24}
                color={isFavorite ? theme.colors.accent : theme.colors.textSecondary}
                variant={isFavorite ? "bold" : "outline"}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    icon: {
        borderColor: theme.colors.border,
        borderRadius: 100,
        borderWidth: 1,
        padding: 6
    }
});
