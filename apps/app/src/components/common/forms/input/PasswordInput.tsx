import {
    type TextInputProps,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View
} from "react-native";
import type { Theme } from "@/types/theme";

import { Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export function PasswordInput({ style, ...props }: TextInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <TextInput
                style={[theme.fonts.textBody, styles.input, style]}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={!isPasswordVisible}
                {...props}
            />
            <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.icon}
            >
                <Octicons
                    name={isPasswordVisible ? "eye" : "eye-closed"}
                    size={24}
                    color={theme.colors.textSecondary}
                />
            </TouchableOpacity>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 13,
        width: "100%",
    },
    icon: {
        marginLeft: 10
    },
    input: {
        color: theme.colors.textPrimary
    }
});
