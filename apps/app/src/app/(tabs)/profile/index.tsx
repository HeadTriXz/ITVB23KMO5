import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigateButton, SecondaryButton } from "@/components/common/buttons";
import { ThemedText, ThemedView } from "@/components/base";

import { ErrorBox, NetworkWarningBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { Image } from "expo-image";
import { useAccount } from "@/hooks/account/useAccount";
import { useAuth } from "@/hooks/useAuth";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useTheme } from "@/hooks/useTheme";

export default function ProfileScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { setToken } = useAuth();
    const { isConnected } = useNetworkStatus();
    const { account, error, isLoading } = useAccount();

    const onSignOut = () => {
        setToken(null);
    };

    if (error) {
        return (
            <ThemedView style={styles.container}>
                <Header title="Profile" withBackButton />
                <ErrorBox message={error.message} />
            </ThemedView>
        );
    }

    if (isLoading || !account) {
        return (
            <ThemedView style={styles.container}>
                <Header title="Profile" withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Profile" />
            <View style={styles.contentContainer}>
                <View style={styles.mainContent}>
                    {!isConnected && <NetworkWarningBox />}
                    <View style={styles.profileSection}>
                        <Image source={account.imageUrl || `avatar${account.id % 5}`} style={styles.avatar} />
                        <View>
                            <ThemedText style={styles.name}>
                                {account.firstName} {account.lastName}
                            </ThemedText>
                            <ThemedText>{account.login}</ThemedText>
                        </View>
                    </View>

                    <View>
                        <ThemedText variant="headingMedium" style={styles.heading}>
                            Settings
                        </ThemedText>
                        <View style={styles.settingsGroup}>
                            <NavigateButton destination="/profile/settings/account" icon="user" disabled={!isConnected}>
                                Account
                            </NavigateButton>
                            <NavigateButton destination="/profile/settings/appearance" icon="pallete-2">
                                Appearance
                            </NavigateButton>
                        </View>
                    </View>

                    <View>
                        <ThemedText variant="headingMedium" style={styles.heading}>
                            Support
                        </ThemedText>
                        <View style={styles.settingsGroup}>
                            <NavigateButton destination="/support" icon="question-circle">
                                Help
                            </NavigateButton>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <SecondaryButton onPress={onSignOut}>
                        Sign Out
                    </SecondaryButton>
                </View>
            </View>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    avatar: {
        borderRadius: 40,
        height: 70,
        width: 70
    },
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 94
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    footer: {
        gap: 15
    },
    heading: {
        marginBottom: 10
    },
    mainContent: {
        gap: 30
    },
    name: {
        fontFamily: theme.fonts.headingLarge.fontFamily,
        fontSize: 20
    },
    profileSection: {
        alignItems: "center",
        flexDirection: "row",
        gap: 20
    },
    settingsGroup: {
        gap: 15
    }
});
