import { Tabs, TabList, TabSlot, TabTrigger } from "expo-router/ui";

import { StyleSheet } from "react-native";
import { TabButton } from "@/components/TabButton";
import { useTheme } from "@/hooks/useTheme";
import { darkTheme } from "@/constants/theme";
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
    const { token } = useAuth();
    if (!token) {
        return <Redirect href="/(auth)/login" />;
    }

    const theme = useTheme();
    return (
        <Tabs>
            <TabSlot />
            <TabList style={[ styles.tabList, { backgroundColor: theme.colors.navbar }]}>
                <TabTrigger name="index" href="/" asChild>
                    <TabButton icon="home-2">Home</TabButton>
                </TabTrigger>
                <TabTrigger name="favorites" href="/favorites" asChild>
                    <TabButton icon="heart">Favorites</TabButton>
                </TabTrigger>
                <TabTrigger name="trips" href="/trips" asChild>
                    <TabButton icon="calendar">Trips</TabButton>
                </TabTrigger>
                <TabTrigger name="support" href="/support" asChild>
                    <TabButton icon="chat-round-dots">Service</TabButton>
                </TabTrigger>
                <TabTrigger name="profile" href="/profile" asChild>
                    <TabButton icon="user-circle">Profile</TabButton>
                </TabTrigger>
            </TabList>
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabList: {
        alignItems: "center",
        borderColor: darkTheme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        position: "absolute",
        height: 62,
        bottom: 24,
        left: 24,
        right: 24
    }
});
