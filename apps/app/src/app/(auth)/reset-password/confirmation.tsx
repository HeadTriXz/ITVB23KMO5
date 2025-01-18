import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { BackButton } from "@/components/layout/header";
import { Image } from "expo-image";
import { PrimaryButton } from "@/components/common/buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/types/theme";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function ResetPasswordConfirmationScreen() {
    const router = useRouter();
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.content}>
                <View style={styles.header}>
                    <BackButton />
                </View>

                <View style={styles.heading}>
                    <Image source={theme.dark ? "logo-dark" : "logo"} contentFit="contain" style={styles.logo} />
                    <ThemedText style={styles.title} variant="headingLarge">
                        Check your email
                    </ThemedText>
                </View>

                <View style={styles.main}>
                    <ThemedText style={styles.description}>
                        If the email address you provided is valid, we&#39;ve sent you a link to reset your password.
                        Please check your inbox and follow the instructions.
                    </ThemedText>

                    <PrimaryButton onPress={() => router.replace("/login")} style={styles.button}>
                        Log In
                    </PrimaryButton>
                </View>
            </SafeAreaView>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    button: {
        marginTop: 48
    },
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 24
    },
    description: {
        color: theme.colors.textSecondary,
        marginTop: 12,
        textAlign: "center"
    },
    header: {
        alignItems: "flex-start",
        marginBottom: 20
    },
    heading: {
        alignItems: "center",
        gap: 15,
        marginTop: 20
    },
    logo: {
        height: 40,
        margin: 20,
        width: 40
    },
    main: {
        flex: 1,
        gap: 15
    },
    title: {
        textAlign: "center"
    }
});
