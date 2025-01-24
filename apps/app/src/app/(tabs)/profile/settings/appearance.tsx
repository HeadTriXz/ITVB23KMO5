import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { Header } from "@/components/layout/header";
import { SelectableButton } from "@/components/common/buttons";
import { useSettings } from "@/hooks/useSettings";

const THEME_OPTIONS = [
    {
        icon: "smartphone",
        label: "System",
        value: "system"
    },
    {
        icon: "moon",
        label: "Dark",
        value: "dark"
    },
    {
        icon: "sun",
        label: "Light",
        value: "light"
    }
] as const;

export default function AppearanceSettingsScreen() {
    const { settings, updateSettings } = useSettings();

    return (
        <ThemedView style={styles.container}>
            <Header title="Appearance" withBackButton />
            <View style={styles.content}>
                <View>
                    <ThemedText variant="headingMedium" style={styles.heading}>
                        Theme
                    </ThemedText>

                    <View style={styles.settings}>
                        {THEME_OPTIONS.map((option) => (
                            <SelectableButton
                                key={option.value}
                                icon={option.icon}
                                selected={settings.theme === option.value}
                                onPress={() => updateSettings({ theme: option.value })}
                            >
                                {option.label}
                            </SelectableButton>
                        ))}
                    </View>
                </View>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 94
    },
    content: {
        flex: 1,
        gap: 45
    },
    heading: {
        marginBottom: 10
    },
    settings: {
        gap: 15
    }
});
