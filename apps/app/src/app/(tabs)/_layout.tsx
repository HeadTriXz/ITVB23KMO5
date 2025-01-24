import type { Theme } from "@/types/theme";

import { Tabs, TabList, TabSlot, TabTrigger } from "expo-router/ui";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";
import { TabButton } from "@/components/layout/navigation/TabButton";
import { darkTheme } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

export default function TabLayout() {
    const { token } = useAuth();
    if (!token) {
        return <Redirect href="/(auth)/welcome" />;
    }

    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <Tabs options={{ backBehavior: "history" }}>
            <TabSlot />
            <TabList style={styles.tabList}>
                <TabTrigger name="index" href="/(tabs)/(home)" asChild>
                    <TabButton icon="home-2">Home</TabButton>
                </TabTrigger>
                <TabTrigger name="favorites" href="/(tabs)/favorites" asChild>
                    <TabButton icon="heart">Favorites</TabButton>
                </TabTrigger>
                <TabTrigger name="trips" href="/(tabs)/trips" asChild>
                    <TabButton icon="calendar">Trips</TabButton>
                </TabTrigger>
                <TabTrigger name="support" href="/(tabs)/support" asChild>
                    <TabButton icon="chat-round-dots">Service</TabButton>
                </TabTrigger>
                <TabTrigger name="profile" href="/(tabs)/profile" asChild>
                    <TabButton icon="user-circle">Profile</TabButton>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    tabList: {
        alignItems: "center",
        backgroundColor: theme.colors.navbar,
        borderColor: darkTheme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        bottom: 16,
        flexDirection: "row",
        height: 62,
        justifyContent: "space-between",
        left: 16,
        paddingHorizontal: 24,
        position: "absolute",
        right: 16
    }
});
