import { type Ref, forwardRef } from "react";

import { Pressable, StyleSheet, View } from "react-native";
import { SolarIcon } from "@/icons/solar/SolarIcon";
import { TabTriggerSlotProps } from "expo-router/build/ui";
import { ThemedText } from "@/components/base/ThemedText";
import { darkTheme } from "@/constants/theme";

export type TabButtonProps = TabTriggerSlotProps & {
    icon: string;
};

export const TabButton = forwardRef((
    { icon, children, isFocused, ...props }: TabButtonProps,
    ref: Ref<View>
) => {
    const variant = isFocused ? "bold" : "duotone";
    const color = isFocused ? darkTheme.colors.textPrimary : darkTheme.colors.textSecondary;

    return (
        <Pressable ref={ref} {...props}>
            <View style={styles.container}>
                <SolarIcon name={icon} size={24} color={darkTheme.colors.textPrimary} variant={variant}/>
                <ThemedText variant="textSmall" style={[styles.text, { color }]}>{children}</ThemedText>
            </View>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 2
    },
    text: {
        fontSize: 11,
        textAlign: "center"
    }
});
