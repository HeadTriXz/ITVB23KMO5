import { EndRentalContext } from "@/context/EndRentalContext";
import { useContext } from "react";

export function useEndRental() {
    const context = useContext(EndRentalContext);
    if (!context) {
        throw new Error("useEndRental must be used within a EndRentalProvider");
    }

    return context;
}
