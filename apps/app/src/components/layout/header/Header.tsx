import { StyleSheet, View } from "react-native";

import { BackButton, NotificationButton } from "@/components/layout/header/buttons";
import { Image } from "expo-image";
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
        gap: 15
    },
    headerContainer: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        flex: 1
    },
    headerIcon: {
        height: 30,
        marginRight: 15,
        width: 30
    },
    headerTitle: {
        color: theme.colors.textPrimary
    }
});
