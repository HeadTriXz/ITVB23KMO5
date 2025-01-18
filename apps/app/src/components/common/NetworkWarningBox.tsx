import type { ViewStyle } from "react-native";
import { WarningBox } from "@/components/common/WarningBox";

export interface NetworkWarningBoxProps {
    style?: ViewStyle;
}

export function NetworkWarningBox({ style }: NetworkWarningBoxProps) {
    return (
        <WarningBox message="You are offline. Some features may not be available" style={style} />
    );
}
