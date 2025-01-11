import { type ReactNode, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SolarBoldDuotone } from "@/components/icons/solar/SolarBoldDuotone";
import { ThemedText } from "@/components/base/ThemedText";
import { useTheme } from "@/hooks/useTheme";

interface CollapsibleFilterSectionProps {
    title: string;
    children: ReactNode;
}

export function CollapsibleFilterSection({ title, children }: CollapsibleFilterSectionProps) {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setIsExpanded(!isExpanded)} style={styles.header}>
                <ThemedText variant="headingMedium">{title}</ThemedText>
                {isExpanded
                    ? <SolarBoldDuotone name="round-alt-arrow-up" size={28} color={theme.colors.textPrimary} />
                    : <SolarBoldDuotone name="round-alt-arrow-down" size={28} color={theme.colors.textPrimary} />
                }
            </Pressable>
            {isExpanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    content: {
        paddingVertical: 10
    },
    header: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
