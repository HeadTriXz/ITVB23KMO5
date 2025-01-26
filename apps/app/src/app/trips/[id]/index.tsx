import type { APIGetCarResult } from "@/types/api";
import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ErrorBox, WarningBox } from "@/components/common";
import { NavigateButton, PrimaryButton } from "@/components/common/buttons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ThemedText, ThemedView } from "@/components/base";
import { BookingHeader } from "@/components/booking/BookingHeader";
import { ConfirmationModal } from "@/components/common/modals/ConfirmationModal";
import { DateDisplay } from "@/components/booking/calendar";
import { Header } from "@/components/layout/header";
import { Image } from "expo-image";
import { LocationPreview } from "@/components/maps/LocationPreview";
import { useDeleteRental } from "@/hooks/rentals/useDeleteRental";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { useRental } from "@/hooks/rentals/useRental";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function TripDetailsScreen() {
    const theme = useTheme();
    const styles = useStyles(theme);

    const { isConnected, runWhenConnected } = useNetworkStatus();
    const { deleteRentalAsync } = useDeleteRental();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { error, isLoading, rental } = useRental(Number(id));

    const router = useRouter();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const onEndPress = () => {
        runWhenConnected(() => {
            if (rental?.state === "ACTIVE") {
                return router.push(`/trips/${id}/end/mileage`);
            }

            setShowCancelModal(true);
        });
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
        const message = error.message === "404 NOT_FOUND"
            ? "This trip has been cancelled."
            : error.message;

        return (
            <ThemedView style={[styles.screenContainer, styles.contentContainer]}>
                <Header withBackButton />
                <ErrorBox message={message} />
            </ThemedView>
        );
    }

    if (isLoading || !rental?.car) {
        return (
            <ThemedView style={[styles.screenContainer, styles.contentContainer]}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    if (rental.state === "RETURNED") {
        return (
            <ThemedView style={[styles.screenContainer, styles.contentContainer]}>
                <Header withBackButton />
                <WarningBox message="This trip has already ended." />
            </ThemedView>
        );
    }

    const isActive = rental.state === "ACTIVE";
    const renderNavigateButton = () => {
        if (isActive) {
            return (
                <NavigateButton destination={`/trips/${id}/damage`} icon="sledgehammer" disabled={!isConnected}>
                    Report Damage
                </NavigateButton>
            );
        }

        return (
            <NavigateButton destination={`/trips/${id}/adjust-date`} icon="clock-circle" disabled={!isConnected}>
                Adjust Booking Date
            </NavigateButton>
        );
    }

    return (
        <ThemedView style={styles.screenContainer}>
            <Header />
            <View style={styles.contentContainer}>
                <BookingHeader car={rental.car as APIGetCarResult} />
                <Image source={`data:image/png;base64,${rental.car.picture}`} style={styles.image} />
            </View>
            <ThemedView style={styles.detailsSection}>
                <View>
                    <DateDisplay fromDate={rental.fromDate} toDate={rental.toDate} style={styles.dateRow} />
                    <View style={styles.detailsContainer}>
                        <LocationPreview latitude={rental.latitude} longitude={rental.longitude} />
                        {renderNavigateButton()}
                    </View>
                </View>
                <PrimaryButton
                    onPress={onEndPress}
                    loading={isCancelling}
                    disabled={!isConnected}
                    style={styles.actionButton}
                >
                    {isActive ? "End Booking" : "Cancel Booking"}
                </PrimaryButton>
            </ThemedView>

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
    actionButton: {
        width: '100%'
    },
    contentContainer: {
        padding: 16
    },
    dateRow: {
        marginBottom: 40,
        marginTop: 16
    },
    detailsContainer: {
        gap: 16
    },
    detailsSection: {
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        justifyContent: "space-between",
        padding: 16
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
    screenContainer: {
        backgroundColor: theme.colors.card,
        flex: 1
    }
});
