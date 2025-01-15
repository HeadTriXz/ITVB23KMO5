import { type ReactNode, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useOnlineManager } from "@/hooks/useOnlineManager";

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
            if (router.canDismiss()) {
                router.dismissAll();
            }

            router.replace("/(tabs)/(home)");
        } else if (!inAuthGroup && !token) {
            if (router.canDismiss()) {
                router.dismissAll();
            }

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
    useOnlineManager();

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DataProvider>
                    <ThemeProvider>
                        <StatusBar style="auto" />
                        <AuthGuard>
                            <Stack screenOptions={{ headerShown: false }} />
                        </AuthGuard>
                    </ThemeProvider>
                </DataProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
