import { createContext, type ReactNode, useState } from "react";

interface EndRentalMileageData {
    image: string;
    value: number;
}

interface EndRentalLocationData {
    latitude: number;
    longitude: number;
}

interface EndRentalData {
    mileage: EndRentalMileageData | null;
    location: EndRentalLocationData | null;
}

interface EndRentalContextProps {
    data: EndRentalData;
    setMileageData: (data: EndRentalMileageData) => void;
    setLocationData: (data: EndRentalLocationData) => void;
    resetData: () => void;
}

interface EndRentalProviderProps {
    children: ReactNode;
}

export const EndRentalContext = createContext<EndRentalContextProps>({
    data: {
        mileage: null,
        location: null
    },
    setMileageData: () => {},
    setLocationData: () => {},
    resetData: () => {}
});

export function EndRentalProvider({ children }: EndRentalProviderProps) {
    const [data, setData] = useState<EndRentalData>({
        mileage: null,
        location: null
    });

    const setMileageData = (mileage: EndRentalMileageData) => {
        setData((prevData) => ({ ...prevData, mileage }));
    };

    const setLocationData = (location: EndRentalLocationData) => {
        setData((prevData) => ({ ...prevData, location }));
    };

    const resetData = () => {
        setData({
            mileage: null,
            location: null
        });
    };

    return (
        <EndRentalContext.Provider value={{ data, setMileageData, setLocationData, resetData }}>
            {children}
        </EndRentalContext.Provider>
    );
}
