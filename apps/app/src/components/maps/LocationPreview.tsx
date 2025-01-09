import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { getStaticMapURL, openAddressOnMap } from "@/utils/location";

import { ErrorBox } from "@/components/ErrorBox";
import { Image } from "expo-image";
import { MapMarker } from "@/components/maps/MapMarker";
import { ThemedText } from "@/components/base";
import { useGeocodedLocation } from "@/hooks/useGeocodedLocation";
import { useTheme } from "@/hooks/useTheme";

interface LocationPreviewProps {
    latitude: number;
    longitude: number;
}

export function LocationPreview({ latitude, longitude }: LocationPreviewProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const mapURL = getStaticMapURL(latitude, longitude);
    const { error, isLoading, location } = useGeocodedLocation(latitude, longitude);

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <ErrorBox message={error} />;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => openAddressOnMap(location!.formattedAddress!, latitude, longitude)}
            activeOpacity={0.7}
        >
            <View>
                <Image
                    source={{ uri: mapURL, headers: { "User-Agent": "AutoMaat" } }}
                    style={styles.mapImage}
                    contentFit="cover"
                />
                <MapMarker />
            </View>
            <View style={{ flex: 1 }}>
                <ThemedText style={{ flexWrap: "wrap", marginBottom: 4 }}>
                    {location?.formattedAddress}
                </ThemedText>
                <ThemedText variant="textSmall" style={styles.textSecondary}>Pick-up Location</ThemedText>
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    mapImage: {
        borderRadius: 5,
        width: 80,
        height: 80
    },
    textSecondary: {
        color: theme.colors.textSecondary
    }
});
