import type { LabeledValue } from "@/constants/cars";
import type { Theme } from "@/types/theme";

import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/base/ThemedText";
import { useTheme } from "@/hooks/useTheme";

interface MultiSelectFilterProps {
    lookupArray?: LabeledValue[];
    options: string[];
    onSelect: (option: string) => void;
    selectedOptions: string[];
}

export function MultiSelectFilter({ lookupArray, options, onSelect, selectedOptions }: MultiSelectFilterProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            {options.map((option) => (
                <Pressable
                    key={option}
                    onPress={() => onSelect(option)}
                    style={[
                        styles.option,
                        selectedOptions.includes(option)
                            ? styles.selectedOption
                            : styles.unselectedOption
                    ]}
                >
                    <ThemedText style={selectedOptions.includes(option) ? styles.selectedText : styles.unselectedText}>
                        {lookupArray?.find((item) => item.value === option)?.label || option}
                    </ThemedText>
                </Pressable>
            ))}
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1
    },
    selectedOption: {
        backgroundColor: theme.colors.accent,
        borderColor: theme.colors.accent
    },
    selectedText: {
        color: "#FFFFFF"
    },
    unselectedOption: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border
    },
    unselectedText: {
        color: theme.colors.textSecondary
    }
});
