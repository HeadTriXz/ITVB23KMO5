import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
    const { token } = useAuth();
    if (token) {
        return <Redirect href="/(tabs)" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
