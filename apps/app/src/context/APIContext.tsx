import { ReactNode, createContext } from "react";
import { APIService } from "@/services/api";

interface APIProviderProps {
    children: ReactNode;
}

export const APIContext = createContext<APIService | null>(null);

export function APIProvider({ children }: APIProviderProps) {
    if (!process.env.EXPO_PUBLIC_API_URL) {
        throw new Error("The 'EXPO_PUBLIC_API_URL' environment variable must be set");
    }

    const api = new APIService(process.env.EXPO_PUBLIC_API_URL);

    return (
        <APIContext.Provider value={api}>
            {children}
        </APIContext.Provider>
    );
}
