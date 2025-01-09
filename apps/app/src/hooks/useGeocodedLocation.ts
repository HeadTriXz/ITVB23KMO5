import { PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useGeocodedLocation(latitude: number, longitude: number) {
    const [location, setLocation] = useState<Location.LocationGeocodedAddress | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== PermissionStatus.GRANTED) {
                    return setError("Location permission denied, but is required to show the location of the car.");
                }

                const locations = await Location.reverseGeocodeAsync({ latitude, longitude });
                const location = locations[0];
                if (location.formattedAddress !== null) {
                    location.formattedAddress = location.formattedAddress.split(", ").slice(0, -1).join(", ");
                }

                setLocation(location);
            } catch {
                setError("Failed to fetch location");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocation();
    }, [latitude, longitude]);

    return { location, isLoading, error };
}
