import { type TextStyle, StyleSheet, TouchableOpacity } from "react-native";

import { SolarIcon } from "@/components/icons/solar/SolarIcon";
import { Theme } from "@/types/theme";
import { useFavorite } from "@/hooks/favorites/useFavorite";
import { useTheme } from "@/hooks/useTheme";
import { useToggleFavorite } from "@/hooks/favorites/useToggleFavorite";

interface FavoriteButtonProps {
    id: number;
    style?: TextStyle;
}

export function FavoriteButton({ id, style }: FavoriteButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { isFavorite } = useFavorite(id);
    const { toggleFavorite } = useToggleFavorite();

    return (
        <TouchableOpacity onPressOut={() => toggleFavorite(id)}>
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
