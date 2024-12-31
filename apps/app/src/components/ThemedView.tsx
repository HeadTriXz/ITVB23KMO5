import { type ViewProps, View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/types/theme";

export function ThemedView({ style, ...props }: ViewProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return <View style={[styles.container, style]} {...props} />;
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background
    }
});
