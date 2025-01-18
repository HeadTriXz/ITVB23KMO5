import { type ReactNode, createContext } from "react";
import type { Theme } from "@/types/theme";

import { darkTheme, lightTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { useSettings } from "@/hooks/useSettings";

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const systemTheme = useColorScheme();
    const { settings } = useSettings();

    const getTheme = () => {
        if (settings.theme === "light") {
            return lightTheme;
        } else if (settings.theme === "dark") {
            return darkTheme;
        } else {
            return systemTheme === "dark" ? darkTheme : lightTheme;
        }
    };

    const theme = getTheme();
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}
