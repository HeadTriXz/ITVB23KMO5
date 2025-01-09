import { StyleSheet, View } from "react-native";

import { BackButton } from "@/components/layout/header/BackButton";
import { Image } from "expo-image";
import { NotificationButton } from "@/components/layout/header/NotificationButton";
import { Stack } from "expo-router";
import { Theme } from "@/types/theme";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
    dismissAll?: boolean;
    title?: string;
    withBackButton?: boolean;
    withNotificationsButton?: boolean;
}

export function Header({ dismissAll, title = "", withBackButton, withNotificationsButton }: HeaderProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <Stack.Screen
            options={{
                headerBackground: () => (
                    <View style={styles.headerContainer}/>
                ),
                headerTitle: title,
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitle,
                headerLeft: () => (
                    <Image source={theme.dark ? "logo-dark" : "logo"} style={styles.headerIcon}/>
                ),
                headerRight: () => (
                    <View style={styles.headerButtons}>
                        {withBackButton && <BackButton dismissAll={dismissAll} />}
                        {withNotificationsButton && <NotificationButton />}
                    </View>
                ),
                headerShown: true
            }}
        />
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    headerButtons: {
        flexDirection: "row",
        gap: 15,
        marginHorizontal: 8
    },
    headerContainer: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        flex: 1
    },
    headerIcon: {
        height: 30,
        marginLeft: 8,
        marginRight: 15,
        width: 30
    },
    headerTitle: {
        color: theme.colors.textPrimary
    }
});
