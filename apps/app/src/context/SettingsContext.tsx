import {
    type ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import AsyncStorage from "expo-sqlite/kv-store";

interface Settings {
    theme: "light" | "dark" | "system";
}

interface SettingsProviderProps {
    children: ReactNode;
}

interface SettingsContextProps {
    settings: Settings;
    updateSettings: (settings: Partial<Settings>) => void;
}

const SETTINGS_STORAGE_KEY = "settings";

export const SettingsContext = createContext<SettingsContextProps>({
    settings: {
        theme: "system"
    },
    updateSettings: () => {}
});

export function SettingsProvider({ children }: SettingsProviderProps) {
    const [settings, setSettings] = useState<Settings>({
        theme: "system"
    });

    useEffect(() => {
        AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
            .then((stored) => {
                if (stored) {
                    setSettings(JSON.parse(stored));
                }
            })
            .catch(console.error);
    }, []);

    const updateSettings = async (newSettings: Partial<Settings>) => {
        setSettings({
            ...settings,
            ...newSettings
        });

        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({
            ...settings,
            ...newSettings
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}
