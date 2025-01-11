import { type TextStyle, StyleSheet, TouchableOpacity } from "react-native";

import { useCallback, useEffect, useState } from "react";
import { SolarIcon } from "@/components/icons/solar/SolarIcon";
import { Theme } from "@/types/theme";
import { useTheme } from "@/hooks/useTheme";
import { useData } from "@/hooks/useData";

interface FavoriteButtonProps {
    id: number;
    style?: TextStyle;
}

export function FavoriteButton({ id, style }: FavoriteButtonProps) {
    const { storage } = useData();

    const theme = useTheme();
    const styles = useStyles(theme);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        storage!.favorites
            .isFavorite(id)
            .then(setIsFavorite);
    }, [id]);

    const onPress = useCallback(async () => {
        try {
            if (isFavorite) {
                await storage!.favorites.removeFavorite(id);
            } else {
                await storage!.favorites.addFavorite(id);
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Failed to toggle favorite", error);
        }
    }, [isFavorite]);

    return (
        <TouchableOpacity onPress={onPress}>
            <SolarIcon
                name="heart"
                size={24}
                color={isFavorite ? theme.colors.accent : theme.colors.textSecondary}
                variant={isFavorite ? "bold" : "outline"}
                style={[styles.icon, style]}
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
