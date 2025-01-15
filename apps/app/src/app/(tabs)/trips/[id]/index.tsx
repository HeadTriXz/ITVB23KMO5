import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText, ThemedView } from "@/components/base";
import { BookingHeader } from "@/components/booking/BookingHeader";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { DateDisplay } from "@/components/booking/calendar";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { Image } from "expo-image";
import { LocationPreview } from "@/components/maps/LocationPreview";
import { NavigateButton } from "@/components/common/buttons/NavigateButton";
import { PrimaryButton } from "@/components/common/buttons";
import { useDeleteRental } from "@/hooks/rentals/useDeleteRental";
import { useRental } from "@/hooks/rentals/useRental";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function TripDetailsScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { deleteRentalAsync } = useDeleteRental();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { error, isLoading, rental } = useRental(Number(id));

    const router = useRouter();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const onEndPress = () => {
        if (rental?.state === "ACTIVE") {
            return router.push(`/(tabs)/trips/${id}/end/mileage`);
        }

        setShowCancelModal(true);
    };

    const onCancel = async () => {
        try {
            await deleteRentalAsync(Number(id));

            router.back();
        } catch {
            setShowCancelModal(false);
        } finally {
            setIsCancelling(false);
        }
    }

    if (error) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ErrorBox message={error.message} />
            </ThemedView>
        );
    }

    if (isLoading || !rental?.car) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    const isActive = rental.state === "ACTIVE";
    const renderNavigateButton = () => {
        if (isActive) {
            return (
                <NavigateButton destination={`/(tabs)/trips/${id}/damage`} icon="sledgehammer">
                    Report Damage
                </NavigateButton>
            );
        }

        return (
            <NavigateButton destination={`/(tabs)/trips/${id}/adjust-date`} icon="clock-circle">
                Adjust Booking Date
            </NavigateButton>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header />
            <BookingHeader car={rental.car as APIGetCarResult} />
            <View style={styles.contentContainer}>
                <Image source={`data:image/png;base64,${rental.car.picture}`} style={styles.image} />
                <DateDisplay fromDate={rental.fromDate} toDate={rental.toDate} />
                <View style={styles.actionsContainer}>
                    <View style={styles.idk}>
                        <LocationPreview latitude={rental.latitude} longitude={rental.longitude} />
                        {renderNavigateButton()}
                    </View>
                    <PrimaryButton onPress={onEndPress}>
                        {isActive ? "End Booking" : "Cancel Booking"}
                    </PrimaryButton>
                </View>
            </View>

            <ConfirmationModal
                isVisible={showCancelModal}
                title="Cancel Booking"
                onClose={() => setShowCancelModal(false)}
                onConfirm={onCancel}
                loading={isCancelling}
            >
                <View style={styles.modalContent}>
                    <ThemedText>
                        Are you sure you want to cancel this booking?
                    </ThemedText>
                </View>
            </ConfirmationModal>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    actionsContainer: {
        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    contentContainer: {
        flex: 1,
        gap: 24
    },
    idk: {
        gap: 15
    },
    image: {
        aspectRatio: 16 / 9,
        borderRadius: 10,
        width: "100%"
    },
    modalContent: {
        gap: 16,
        paddingVertical: 8
    },
    modalNote: {
        color: theme.colors.textSecondary
    }
});
