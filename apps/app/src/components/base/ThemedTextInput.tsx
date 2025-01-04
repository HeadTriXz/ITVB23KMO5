import { type TextInputProps, TextInput, StyleSheet } from "react-native";
import type { Theme } from "@/types/theme";

import { useTheme } from "@/hooks/useTheme";

export function ThemedTextInput({ style, ...props }: TextInputProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return <TextInput
        style={[theme.fonts.textBody, styles.input, style]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
    />;
}

const useStyles = (theme: Theme) => StyleSheet.create({
    input: {
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        color: theme.colors.textPrimary,
        paddingHorizontal: 20,
        paddingVertical: 13,
        width: "100%"
    },
});
