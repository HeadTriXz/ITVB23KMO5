import React, { type ReactNode, useEffect } from "react";

import { Stack, useRouter, useSegments } from "expo-router";
import { APIProvider } from "@/context/APIContext";
import { AuthProvider } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";

import * as SplashScreen from "expo-splash-screen";

interface AuthGuardProps {
    children: ReactNode;
}

SplashScreen.preventAutoHideAsync();

function AuthGuard({ children }: AuthGuardProps) {
    const segments = useSegments();
    const router = useRouter();

    const { isReady, token } = useAuth();

    useEffect(() => {
        if (!isReady) {
            return;
        }

        const inAuthGroup = segments[0] === "(auth)";
        if (inAuthGroup && token) {
            router.replace("/(tabs)");
        } else if (!inAuthGroup && !token) {
            router.replace("/(auth)/login");
        }
    }, [token, segments, router, isReady]);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return children;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <APIProvider>
                <ThemeProvider>
                    <StatusBar style="auto" />
                    <AuthGuard>
                        <Stack screenOptions={{ headerShown: false }} />
                    </AuthGuard>
                </ThemeProvider>
            </APIProvider>
        </AuthProvider>
    )
}
