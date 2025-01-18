import {
    type ReactNode,
    createContext,
    useEffect,
    useState
} from "react";

import { API } from "@/data/remote/api";
import { LocalStorage } from "@/data/local/storage";
import { RESTClient } from "@/data/remote/client";
import { db } from "@/data/local/database";
import { useAuth } from "@/hooks/useAuth";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import AsyncStorage from "expo-sqlite/kv-store";
import migrations from "@/data/local/migrations/migrations";

interface DataProviderProps {
    children: ReactNode;
}

interface DataContextProps {
    api: API | null;
    isAuthenticated?: boolean;
    isReady?: boolean;
    storage: LocalStorage | null;
}

export const DataContext = createContext<DataContextProps>({
    api: null,
    isAuthenticated: false,
    isReady: false,
    storage: null
});

export function DataProvider({ children }: DataProviderProps) {
    if (!process.env.EXPO_PUBLIC_API_URL) {
        throw new Error("The 'EXPO_PUBLIC_API_URL' environment variable must be set");
    }

    const { isReady, token } = useAuth();
    const { success, error } = useMigrations(db, migrations);

    const [context, setContext] = useState<DataContextProps>({
        api: null,
        isAuthenticated: false,
        isReady: false,
        storage: null
    });

    useEffect(() => {
        if (!success || !isReady) {
            return;
        }

        const storage = new LocalStorage(db);

        const rest = new RESTClient(process.env.EXPO_PUBLIC_API_URL);
        const api = new API(rest);

        setContext({
            api: api,
            isAuthenticated: false,
            isReady: isReady,
            storage: storage
        });
    }, [success, isReady]);

    useEffect(() => {
        const handleTokenChange = async () => {
            if (!context.api) {
                return;
            }

            try {
                context.api.rest.setToken(token);

                if (!token) {
                    await Promise.all([
                        context.storage?.clear(),
                        AsyncStorage.clear()
                    ]);
                }

                setContext({ ...context, isAuthenticated: !!token });
            } catch (err: unknown) {
                console.error(err);
            }
        };

        handleTokenChange();
    }, [context.api, token]);

    if (error) {
        throw new Error(`Database migration failed: ${error}`);
    }

    return (
        <DataContext.Provider value={context}>
            {children}
        </DataContext.Provider>
    );
}
