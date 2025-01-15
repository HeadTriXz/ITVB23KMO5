import { type Address, AddressForm } from "@/components/common/forms/input/AddressForm";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BookingHeader } from "@/components/booking/BookingHeader";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { PermissionStatus } from "expo-location";
import { PrimaryButton } from "@/components/common/buttons";
import { SelectableButton } from "@/components/common/buttons/SelectableButton";
import { useEndRental } from "@/hooks/useEndRental";
import { useRental } from "@/hooks/rentals/useRental";
import * as Location from "expo-location";

export default function UploadLocationScreen() {
    const router = useRouter();

    const { data, setLocationData } = useEndRental();
    if (!data.mileage) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message="Missing required data. Please go back and try again." />
            </ThemedView>
        );
    }

    const { id } = useLocalSearchParams<{ id: string }>();
    const { error: rentalError, isLoading: isRentalLoading, rental } = useRental(Number(id), {
        skipStorageLoad: true
    });

    const [useCustomLocation, setUseCustomLocation] = useState<boolean>(false);
    const [address, setAddress] = useState<Address>({
        city: "",
        postalCode: "",
        province: "",
        street: ""
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const parseAddress = (address: Address) =>
        `${address.street}, ${address.postalCode}, ${address.city}, ${address.province}, Netherlands`;

    const getCoordinates = async (address: Address) => {
        const query = parseAddress(address);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`
        );

        const data = await response.json() as Array<{ lat: string, lon: string }>;
        if (data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon)
            };
        }
    };

    const onNext = async () => {
        setError("");
        setIsLoading(true);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== PermissionStatus.GRANTED) {
                return;
            }

            const location = useCustomLocation
                ? await getCoordinates(address)
                : await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation })
                    .then(({ coords }) => coords);

            if (!location) {
                return setError("Location not found.");
            }

            setLocationData({
                latitude: location.latitude,
                longitude: location.longitude
            });

            router.push(`/(tabs)/trips/${id}/end/payment`);
        } catch {
            setError("Location not found.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setError("");
    }, [useCustomLocation, address]);

    if (rentalError) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message={rentalError.message} />
            </ThemedView>
        );
    }

    if (isRentalLoading || !rental?.car) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    const isFormIncomplete = useCustomLocation &&
        (!address.city || !address.postalCode || !address.street || !address.province);

    return (
        <ThemedView style={styles.container}>
            <Header />
            <BookingHeader car={rental.car} />
            <View style={styles.content}>
                <View style={styles.body}>
                    <View>
                        <ThemedText variant="headingMedium">
                            Drop-off Location
                        </ThemedText>
                        <ThemedText style={styles.description}>
                            Choose where you&#39;d like to return the car. By default, we&#39;ll use your current
                            location.
                        </ThemedText>
                    </View>
                    <View style={styles.inputContainer}>
                        {error && <ErrorBox message={error} />}
                        <View style={styles.buttonGroup}>
                            <SelectableButton
                                icon="gps"
                                onPress={() => setUseCustomLocation(false)}
                                selected={!useCustomLocation}
                            >
                                Use Current Location
                            </SelectableButton>
                            <SelectableButton
                                icon="map-point-wave"
                                onPress={() => setUseCustomLocation(true)}
                                selected={useCustomLocation}
                            >
                                Set Custom Location
                            </SelectableButton>
                        </View>
                        <AddressForm onChange={setAddress} disabled={!useCustomLocation} />
                    </View>
                </View>
                <PrimaryButton onPress={onNext} disabled={isFormIncomplete} loading={isLoading}>
                    Next
                </PrimaryButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        gap: 24
    },
    buttonGroup: {
        gap: 15
    },
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    description: {
        marginBottom: 8
    },
    inputContainer: {
        gap: 15
    }
});
