import {
    type ViewStyle,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import type { Theme } from "@/types/theme";

import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface ChatInputProps {
    onSend: (message: string) => void;
    style?: ViewStyle;
}

export function ChatInput({ onSend, style }: ChatInputProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [message, setMessage] = useState("");

    const onSendMessage = () => {
        const trimmed = message.trim();
        if (trimmed === "") {
            return;
        }

        onSend(trimmed);
        setMessage("");
    }

    return (
        <View style={[styles.container, style]}>
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Reply..."
                placeholderTextColor={theme.colors.textSecondary}
                style={styles.input}
                multiline
            />
            <TouchableOpacity onPress={onSendMessage} style={styles.icon}>
                <FontAwesome name="send" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        maxHeight: 150,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%"
    },
    icon: {
        backgroundColor: theme.colors.border,
        borderRadius: "50%",
        padding: 10
    },
    input: {
        ...theme.fonts.textBody,
        color: theme.colors.textPrimary,
        flex: 1
    }
});
