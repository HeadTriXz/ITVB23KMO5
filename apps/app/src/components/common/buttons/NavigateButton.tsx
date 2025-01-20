import { type Href, useRouter } from "expo-router";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

import { ActionButton } from "@/components/common/buttons/ActionButton";

interface NavigateButtonProps {
    children: ReactNode;
    destination: Href;
    disabled?: boolean;
    icon?: string;
    style?: ViewStyle;
}

export function NavigateButton({ children, destination, disabled, icon, style }: NavigateButtonProps) {
    const router = useRouter();

    return (
        <ActionButton onPress={() => router.push(destination)} icon={icon} style={style} disabled={disabled}>
            {children}
        </ActionButton>
    );
}
