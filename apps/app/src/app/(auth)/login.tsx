import type { Theme } from "@/types/theme";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { BackButton } from "@/components/layout/header";
import { ErrorBox } from "@/components/common";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { PasswordInput } from "@/components/common/forms";
import { PrimaryButton } from "@/components/common/buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function LoginScreen() {
    const router = useRouter();
    const theme = useTheme();
    const styles = useStyles(theme);

    const { api, isReady } = useData();
    const { setToken } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError("");

        if (!api) {
            return setError("Something went wrong. Please try again.");
        }

        if (!username || !password) {
            return setError("Please fill in all fields.");
        }

        setIsLoading(true);

        try {
            const response = await api.account.loginUser({
                username: username,
                password: password,
                rememberMe: true
            });

            if (response?.id_token) {
                setToken(response.id_token);
                api.rest.setToken(response.id_token);
                router.replace("/");
            } else {
                setError("Invalid username or password.");
            }
        } catch {
            setError("Invalid username or password.");
        } finally {
            setIsLoading(false);
        }
    };

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
                        <ThemedText style={styles.title} variant="headingLarge">
                            Welcome back! Glad to see you again!
                        </ThemedText>
                    </View>
                    <View style={styles.form}>
                        {error && <ErrorBox message={error} />}
                        <ThemedTextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter your username"
                            autoCapitalize="none"
                        />
                        <PasswordInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your password"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.forgotButton}>
                            <ThemedText variant="link" style={styles.forgotText}>Forgot Password?</ThemedText>
                        </TouchableOpacity>
                        <PrimaryButton
                            onPress={handleLogin}
                            disabled={!username || !password}
                            loading={isLoading}
                            style={styles.loginButton}
                        >
                            Login
                        </PrimaryButton>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        padding: 24
    },
    forgotButton: {
        alignSelf: "flex-end",
        height: 32
    },
    forgotText: {
        color: theme.colors.accent
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
    loginButton: {
        marginTop: 8
    },
    logo: {
        height: 48,
        width: 48
    },
    title: {
        textAlign: "center"
    }
});
