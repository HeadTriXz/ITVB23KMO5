import { Platform } from "react-native";
import * as Linking from "expo-linking";

export function getStaticMapURL(latitude: number, longitude: number, zoom: number = 16): string {
    const x = Math.floor((longitude + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));

    return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}

export function openAddressOnMap(label: string, latitude: number, longitude: number) {
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });

    const latLng = `${latitude},${longitude}`;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
    });

    if (!url) {
        return;
    }

    Linking.openURL(url);
}
