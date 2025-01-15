import type { Theme } from "@/types/theme";

import { StyleSheet, View } from "react-native";
import { TripsTab, TripsTabButton } from "@/components/layout/navigation/TripsTabButton";
import { useTheme } from "@/hooks/useTheme";

interface TripsTabBarProps {
    selectedTab: TripsTab;
    onSelectTab: (tab: TripsTab) => void;
}

export function TripsTabBar({ selectedTab, onSelectTab }: TripsTabBarProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <TripsTabButton
                isSelected={selectedTab === TripsTab.Active}
                onPress={onSelectTab}
                tab={TripsTab.Active}
            />
            <TripsTabButton
                isSelected={selectedTab === TripsTab.Upcoming}
                onPress={onSelectTab}
                tab={TripsTab.Upcoming}
            />
            <TripsTabButton
                isSelected={selectedTab === TripsTab.Completed}
                onPress={onSelectTab}
                tab={TripsTab.Completed}
            />
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        marginBottom: 15,
        padding: 10
    }
});
