import React, { type ReactNode, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SettingsProvider } from "@/context/SettingsContext";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useNotificationScheduler } from "@/hooks/useNotificationScheduler";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { useRentalStateManager } from "@/hooks/useRentalStateManager";
import { useTheme } from "@/hooks/useTheme";

import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";

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
            if (router.canDismiss()) {
                router.dismissAll();
            }

            router.replace("/(tabs)/(home)");
        } else if (!inAuthGroup && !token) {
            if (router.canDismiss()) {
                router.dismissAll();
            }

            router.replace("/(auth)/welcome");
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

function AppLayout() {
    useNotificationScheduler();
    useRentalStateManager();

    const theme = useTheme();
    return (
        <>
            <StatusBar style="auto" />
            <AuthGuard>
                <Stack screenOptions={{
                    contentStyle: {
                        backgroundColor: theme.colors.background
                    },
                    headerShown: false
                }}/>
            </AuthGuard>
        </>
    );
}

export default function RootLayout() {
    useOnlineManager();

    Notifications.setNotificationHandler({
        handleNotification: async () => Promise.resolve({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true
        })
    });

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DataProvider>
                    <SettingsProvider>
                        <ThemeProvider>
                            <KeyboardProvider>
                                <AppLayout />
                            </KeyboardProvider>
                        </ThemeProvider>
                    </SettingsProvider>
                </DataProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
