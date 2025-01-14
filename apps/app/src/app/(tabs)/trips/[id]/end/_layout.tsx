import { EndRentalProvider } from "@/context/EndRentalContext";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <EndRentalProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="mileage" />
                <Stack.Screen name="location" />
                <Stack.Screen name="payment" />
            </Stack>
        </EndRentalProvider>
    )
}
