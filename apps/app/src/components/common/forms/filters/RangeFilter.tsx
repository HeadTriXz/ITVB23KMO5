import { StyleSheet } from "react-native";
import { ThemedTextInput } from "@/components/base/ThemedTextInput";
import { View } from "react-native";

interface RangeFilterProps {
    minValue: string;
    maxValue: string;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
    placeholder?: {
        min: string;
        max: string;
    };
}

export function RangeFilter({
    minValue,
    maxValue,
    onMinChange,
    onMaxChange,
    placeholder = { min: "Min", max: "Max" }
}: RangeFilterProps) {
    return (
        <View style={styles.container}>
            <ThemedTextInput
                value={minValue}
                onChangeText={onMinChange}
                placeholder={placeholder.min}
                keyboardType="numeric"
            />
            <ThemedTextInput
                value={maxValue}
                onChangeText={onMaxChange}
                placeholder={placeholder.max}
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 15
    }
});
