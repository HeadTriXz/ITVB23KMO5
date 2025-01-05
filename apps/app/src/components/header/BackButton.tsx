import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/types/theme";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

interface BackButtonProps {
    dismissAll?: boolean;
}

export function BackButton({ dismissAll }: BackButtonProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const onPress = useCallback(() => {
        if (dismissAll) {
            router.dismissAll();
        }

        if (router.canGoBack()) {
            router.back();
        }
    }, []);

    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons
                name="chevron-back"
                size={24}
                color={theme.colors.textSecondary}
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
