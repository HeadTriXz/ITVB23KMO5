import type { Theme } from "@/types/theme";

import { Image, ImageBackground } from "expo-image";
import { PrimaryButton, SecondaryButton } from "@/components/common/buttons";
import { StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/base";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

export default function WelcomeScreen() {
    const theme = useTheme();
    const router = useRouter();
    const styles = useStyles(theme);

    return (
        <View style={styles.container}>
            <ImageBackground source="hero" contentFit="cover" style={styles.fill} />
            <LinearGradient
                colors={[
                    theme.dark ? "rgba(0, 0, 0, 0.4)" : "rgba(245, 245, 245, 0.7)",
                    theme.dark ? "rgba(0, 0, 0, 0.95)" : "rgba(245, 245, 245, 0.98)"
                ]}
                locations={[0, 0.8]}
                style={styles.fill}
            />

            <SafeAreaView style={styles.content}>
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "timing", duration: 1000 }}
                >
                    <Image
                        source={theme.dark ? "logo-dark" : "logo"}
                        contentFit="contain"
                        style={styles.logo}
                    />
                    <ThemedText style={styles.title}>AutoMaat</ThemedText>
                    <ThemedText style={styles.subtitle}>
                        Your journey starts here
                    </ThemedText>
                </MotiView>
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 1000, delay: 400 }}
                    style={styles.actions}
                >
                    <PrimaryButton onPress={() => router.push("/register")}>
                        Register
                    </PrimaryButton>
                    <SecondaryButton onPress={() => router.push("/login")}>
                        Log In
                    </SecondaryButton>
                </MotiView>
            </SafeAreaView>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    actions: {
        alignItems: "center",
        gap: 12,
        marginTop: 48
    },
    container: {
        flex: 1
    },
    content: {
        alignItems: "center",
        flex: 1,
        gap: 16,
        justifyContent: "center",
        padding: 24
    },
    fill: {
        ...StyleSheet.absoluteFillObject
    },
    logo: {
        alignSelf: "center",
        height: 120,
        marginBottom: 16,
        width: 120
    },
    subtitle: {
        color: theme.dark
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.6)",
        fontSize: 18,
        letterSpacing: 0.2,
        lineHeight: 28,
        marginTop: 12,
        textAlign: "center"
    },
    title: {
        fontFamily: theme.fonts.headingLarge.fontFamily,
        fontSize: 44,
        letterSpacing: -0.5,
        lineHeight: 48,
        textAlign: "center"
    }
});
