import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { BackButton } from "@/components/layout/header";
import { Image } from "expo-image";
import { PrimaryButton } from "@/components/common/buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/types/theme";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function AccountActivationScreen() {
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
                        You&#39;re almost there!
                    </ThemedText>
                </View>

                <View style={styles.main}>
                    <ThemedText style={styles.description}>
                        We sent you an activation link. Please check your email and click on the link to activate
                        your account.
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
