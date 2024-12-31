import {
    type ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import type { Theme } from "@/types/theme";

import { darkTheme, lightTheme } from "@/constants/theme";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const systemTheme = useColorScheme() ?? "light";
    const [theme, setTheme] = useState<Theme>(systemTheme === "dark" ? darkTheme : lightTheme);

    useEffect(() => {
        setTheme(systemTheme === "dark" ? darkTheme : lightTheme);
    });

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}
