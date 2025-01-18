import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useNetworkStatus() {
    const [isConnected, setIsConnected] = useState(false);

    const runWhenConnected = (action: () => void) => {
        if (!isConnected) {
            return;
        }

        action();
    }

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(!!state.isConnected);
        });

        NetInfo.fetch().then((state) => {
            setIsConnected(!!state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return {
        isConnected,
        runWhenConnected
    };
}
