import { type TextInputProps, TextInput, StyleSheet } from "react-native";
import type { Theme } from "@/types/theme";

import { useTheme } from "@/hooks/useTheme";

interface ThemedTextInputProps extends TextInputProps {
    disabled?: boolean;
}

export function ThemedTextInput({ disabled, style, ...props }: ThemedTextInputProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return <TextInput
        style={[styles.input, disabled && styles.disabled, style]}
        editable={!disabled}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
    />;
}

const useStyles = (theme: Theme) => StyleSheet.create({
    disabled: {
        backgroundColor: theme.colors.buttonDisabled
    },
    input: {
        ...theme.fonts.textBody,
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        color: theme.colors.textPrimary,
        height: 52,
        paddingHorizontal: 20,
        width: "100%"
    }
});
