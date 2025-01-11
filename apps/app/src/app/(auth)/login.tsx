import { ErrorBox, PasswordInput, PrimaryButton } from "@/components/common";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "@/types/theme";

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
        setIsLoading(true);

        try {
            const response = await api!.account.loginUser({
                username: username,
                password: password,
                rememberMe: true
            });

            if (response?.id_token) {
                setToken(response.id_token);
                api!.rest.setToken(response.id_token);

                router.replace("/");
            } else {
                setError("Invalid username or password.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isReady) {
        return null;
    }

    return (
        <ThemedView style={styles.screenContainer}>
            <SafeAreaView style={styles.contentContainer}>
                <View style={styles.formContainer}>
                    <Image source={theme.dark ? "logo-dark" : "logo"} style={styles.logo} />
                    <ThemedText style={styles.title} variant="headingLarge">
                        Welcome back! Glad to see you again!
                    </ThemedText>
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
                    <TouchableOpacity style={styles.forgotPasswordButton}>
                        <ThemedText variant="link" style={styles.link}>Forgot Password?</ThemedText>
                    </TouchableOpacity>
                    <PrimaryButton onPress={handleLogin} loading={isLoading}>Login</PrimaryButton>
                </View>
                <TouchableOpacity style={styles.footer}>
                    <ThemedText>
                        Don’t have an account? <ThemedText variant="link" style={styles.link}>Sign up</ThemedText>
                    </ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: "100%"
    },
    footer: {
        alignItems: "center"
    },
    forgotPasswordButton: {
        alignSelf: "flex-end",
        marginBottom: 15
    },
    formContainer: {
        alignItems: "center",
        flex: 1,
        gap: 15,
        width: "100%"
    },
    link: {
        color: theme.colors.accent
    },
    logo: {
        height: 40,
        margin: 20,
        width: 40
    },
    screenContainer: {
        alignItems: "center",
        flex: 1,
        padding: 24
    },
    title: {
        marginBottom: 70,
        textAlign: "center"
    }
});
