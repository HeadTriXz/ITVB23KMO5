import {
    ReactNode,
    createContext,
    useEffect,
    useState
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextProps {
    isReady: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AUTH_TOKEN_KEY = "token";

export const AuthContext = createContext<AuthContextProps>({
    isReady: false,
    token: null,
    setToken: () => {}
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setTokenState] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        async function loadToken() {
            try {
                const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
                if (storedToken) {
                    setTokenState(storedToken);
                }
            } catch (error) {
                console.log("Error retrieving token:", error);
            } finally {
                setIsReady(true);
            }
        }

        loadToken();
    }, []);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            SecureStore.setItemAsync(AUTH_TOKEN_KEY, newToken);
        } else {
            SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        }
    };

    return (
        <AuthContext.Provider value={{ isReady, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}
