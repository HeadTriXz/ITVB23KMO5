import { onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

export function useOnlineManager() {
    onlineManager.setEventListener((setOnline) => {
        return NetInfo.addEventListener((state) => {
            setOnline(!!state.isConnected);
        });
    });
}
