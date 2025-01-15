import type { Theme } from "@/types/theme";

import { StyleSheet, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemedText } from "@/components/base";
import { useTheme } from "@/hooks/useTheme";

interface ChecklistItemProps {
    children: string;
}

export function CheckListItem({ children }: ChecklistItemProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <FontAwesome6 name="circle-check" size={20} color={theme.colors.accent} />
            <ThemedText style={styles.text}>{children}</ThemedText>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        marginBottom: 3,
        marginLeft: 10
    },
    text: {
        color: theme.colors.textSecondary
    }
});
