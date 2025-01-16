import type { Theme } from "@/types/theme";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/base";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface FAQCardProps {
    answer: string;
    question: string;
}

export function FAQCard({ answer, question }: FAQCardProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded((prev) => !prev);
    }

    return (
        <TouchableOpacity onPress={toggleExpanded} style={styles.card} activeOpacity={0.7}>
            <View style={styles.questionContainer}>
                <ThemedText variant="headingSmall" style={styles.question}>
                    {question}
                </ThemedText>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={14}
                    color={theme.colors.textSecondary}
                />
            </View>
            {expanded && (
                <View style={styles.answerContainer}>
                    <ThemedText variant="textBody" style={styles.answer}>{answer}</ThemedText>
                </View>
            )}
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    answer: {
        color: theme.colors.textSecondary
    },
    answerContainer: {
        marginTop: 10
    },
    card: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 7,
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 20
    },
    question: {
        flex: 1
    },
    questionContainer: {
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        justifyContent: "space-between"
    }
});
