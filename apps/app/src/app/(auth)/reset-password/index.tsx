import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { BackButton } from "@/components/layout/header";
import { ErrorBox } from "@/components/common";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { PrimaryButton } from "@/components/common/buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useData } from "@/hooks/useData";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const theme = useTheme();
    const { api, isReady } = useData();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onPress = async () => {
        setError("");

        if (!api) {
            return setError("Something went wrong. Please try again.");
        }

        if (!email) {
            return setError("Please fill out all fields.");
        }

        if (!email.includes("@")) {
            return setError("Please enter a valid email address.");
        }

        setIsLoading(true);

        try {
            await api.account.initPasswordReset(email);

            router.replace("/reset-password/confirmation");
        } catch (err: unknown) {
            if (err instanceof Error) {
                return setError(err.message);
            }

            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (!isReady) {
        return null;
    }

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.content}>
                <View style={styles.header}>
                    <BackButton />
                </View>

                <KeyboardAwareScrollView>
                    <View style={styles.heading}>
                        <Image source={theme.dark ? "logo-dark" : "logo"} style={styles.logo} />
                        <ThemedText variant="headingLarge" style={styles.title}>
                            Forgot your password? Don’t worry, we’ll help you reset it!
                        </ThemedText>
                    </View>

                    <View style={styles.form}>
                        {error && <ErrorBox message={error} />}
                        <ThemedTextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                        />

                        <PrimaryButton
                            disabled={!email}
                            loading={isLoading}
                            onPress={onPress}
                            style={styles.button}
                        >
                            Submit
                        </PrimaryButton>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 24
    },
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 24
    },
    form: {
        flex: 1,
        gap: 16
    },
    header: {
        alignSelf: "flex-start",
        marginBottom: 24
    },
    heading: {
        alignItems: "center",
        gap: 16,
        marginBottom: 48
    },
    logo: {
        height: 48,
        width: 48
    },
    title: {
        textAlign: "center"
    }
});
