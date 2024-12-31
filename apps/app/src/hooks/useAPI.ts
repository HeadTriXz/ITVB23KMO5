import { APIContext } from "@/context/APIContext";
import { useContext } from "react";

export function useAPI() {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI must be used within a APIProvider");
    }

    return context;
}
