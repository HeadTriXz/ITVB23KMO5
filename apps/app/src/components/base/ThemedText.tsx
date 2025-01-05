import type { Theme, ThemeFonts } from "@/types/theme";

import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export type ThemedTextProps = TextProps & {
    variant?: keyof ThemeFonts;
}

export function ThemedText({ style, variant = "textBody", ...props }: ThemedTextProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const textStyle = theme.fonts[variant];

    return <Text style={[textStyle, styles.text, style]} {...props} />;
}

const useStyles = (theme: Theme) => StyleSheet.create({
    text: {
        color: theme.colors.textPrimary
    }
});
