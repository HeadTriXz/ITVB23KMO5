import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { getStaticMapURL, openAddressOnMap } from "@/utils/location";

import { ErrorBox } from "@/components/common/ErrorBox";
import { Image } from "expo-image";
import { MapMarker } from "@/components/maps/MapMarker";
import { ThemedText } from "@/components/base";
import { useGeocodedLocation } from "@/hooks/useGeocodedLocation";
import { useTheme } from "@/hooks/useTheme";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { WarningBox } from "@/components/common";

interface LocationPreviewProps {
    latitude: number;
    longitude: number;
}

export function LocationPreview({ latitude, longitude }: LocationPreviewProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const mapURL = getStaticMapURL(latitude, longitude);

    const { isConnected } = useNetworkStatus();
    const { error, isLoading, location } = useGeocodedLocation(latitude, longitude);

    if (!isConnected) {
        return <WarningBox message="No internet connection. Please connect to the internet to view the location." />;
    }

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
            <View style={styles.textContainer}>
                <ThemedText style={styles.textLocation}>
                    {location?.formattedAddress}
                </ThemedText>
                <ThemedText variant="textSmall" style={styles.textSecondary}>Pick-up Location</ThemedText>
            </View>
        </TouchableOpacity>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        gap: 15,
        padding: 10
    },
    mapImage: {
        borderRadius: 5,
        height: 80,
        width: 80
    },
    textContainer: {
        flex: 1
    },
    textLocation: {
        flexWrap: "wrap",
        marginBottom: 4
    },
    textSecondary: {
        color: theme.colors.textSecondary
    }
});
