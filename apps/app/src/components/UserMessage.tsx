import type { Theme } from "@/types/theme";

import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/base";
import { humanReadableTime } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";

interface UserMessageProps {
    content: string;
    createdAt: number;
}

export function UserMessage({ content, createdAt }: UserMessageProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.message}>
                <View style={styles.content}>
                    <ThemedText style={styles.text}>{content}</ThemedText>
                </View>
                <ThemedText variant="textSmall" style={styles.time}>
                    {humanReadableTime(new Date(createdAt))}
                </ThemedText>
            </View>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 64
    },
    content: {
        backgroundColor: theme.colors.buttonPrimary,
        borderRadius: 10,
        flex: 1,
        padding: 10
    },
    message: {
        flex: 1,
        gap: 7
    },
    text: {
        color: theme.colors.background
    },
    time: {
        color: theme.colors.textSecondary
    }
});
