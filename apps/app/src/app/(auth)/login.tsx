import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ErrorBox } from "@/components/ErrorBox";
import { Image } from "expo-image";
import { PasswordInput } from "@/components/PasswordInput";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Theme } from "@/types/theme";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useAPI } from "@/hooks/useAPI";

export default function LoginScreen() {
    const router = useRouter();
    const api = useAPI();

    const theme = useTheme();
    const styles = useStyles(theme);

    const { setToken } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await api.loginUser({
                username: username,
                password: password,
                rememberMe: true
            });

            if (response?.id_token) {
                setToken(response.id_token);
                api.setToken(response.id_token);

                router.replace("/");
            } else {
                setError("Invalid username or password.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ThemedView style={styles.screenContainer}>
            <SafeAreaView style={{ flex: 1, width: "100%" }}>
                <View style={styles.formContainer}>
                    <Image source={theme.dark ? "splash-icon-dark" : "splash-icon"} style={styles.logo} />
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
        width: 75,
        height: 75
    },
    screenContainer: {
        flex: 1,
        alignItems: "center",
        padding: 24
    },
    title: {
        textAlign: "center",
        marginBottom: 70
    }
});
