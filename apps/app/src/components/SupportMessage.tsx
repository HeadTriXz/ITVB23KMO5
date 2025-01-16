import type { Theme } from "@/types/theme";

import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/base";
import { humanReadableTime } from "@/utils/dates";
import { useTheme } from "@/hooks/useTheme";

interface SupportMessageProps {
    content: string;
    createdAt: number;
}

export function SupportMessage({ content, createdAt }: SupportMessageProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <Image source="icon" style={styles.profileImage} />
            <View style={styles.message}>
                <ThemedText variant="headingSmall">Autie</ThemedText>
                <View style={styles.content}>
                    <ThemedText>{content}</ThemedText>
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
        gap: 10,
        marginRight: 20
    },
    content: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        flex: 1,
        padding: 10
    },
    message: {
        flex: 1,
        gap: 7,
        paddingTop: 3
    },
    profileImage: {
        borderRadius: 16,
        height: 32,
        width: 32
    },
    time: {
        alignSelf: "flex-end",
        color: theme.colors.textSecondary
    }
});
