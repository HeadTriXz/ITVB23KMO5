import {
    ReactNode,
    createContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { APIService } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";

interface APIContextProps {
    api: APIService;
    isAuthenticated: boolean;
}

interface APIProviderProps {
    children: ReactNode;
}

export const APIContext = createContext<APIContextProps>({
    api: {} as APIService,
    isAuthenticated: false
});

export function APIProvider({ children }: APIProviderProps) {
    if (!process.env.EXPO_PUBLIC_API_URL) {
        throw new Error("The 'EXPO_PUBLIC_API_URL' environment variable must be set");
    }

    const { token } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const api = useMemo(() => new APIService(process.env.EXPO_PUBLIC_API_URL), []);

    useEffect(() => {
        if (token) {
            api.setToken(token);
            setIsAuthenticated(true);
        }
    }, [token]);

    return (
        <APIContext.Provider value={{ api, isAuthenticated }}>
            {children}
        </APIContext.Provider>
    );
}
