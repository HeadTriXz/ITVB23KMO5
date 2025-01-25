import type { Theme } from "@/types/theme";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";
import { useLocalSearchParams, useRouter } from "expo-router";

import { BookingHeader } from "@/components/booking/BookingHeader";
import { CheckListItem } from "@/components/CheckListItem";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { ImageUpload } from "@/components/ImageUpload";
import { PrimaryButton } from "@/components/common/buttons";
import { useEndRental } from "@/hooks/useEndRental";
import { useRental } from "@/hooks/rentals/useRental";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

export default function UploadMileageScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { error, isLoading, rental } = useRental(Number(id), {
        skipStorageLoad: true
    });

    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const { setMileageData } = useEndRental();
    const [mileage, setMileage] = useState<string>();
    const [image, setImage] = useState<string | null>(null);

    const onChangeMileage = (text: string) => {
        if (!text) {
            return setMileage("");
        }

        const parsed = parseInt(text);
        const isValid = !isNaN(parsed) && parsed >= 0;
        if (!isValid) {
            return;
        }

        setMileage(parsed.toString());
    }

    const onNext = () => {
        if (!mileage || !image) {
            return;
        }

        setMileageData({
            image: image,
            value: parseInt(mileage)
        });

        router.push(`/trips/${id}/end/location`);
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

    return (
        <ThemedView style={styles.container}>
            <Header />
            <BookingHeader car={rental.car} />
            <View style={styles.content}>
                <View style={styles.sections}>
                    <View style={styles.section}>
                        <ThemedText variant="headingMedium">
                            Current Mileage
                        </ThemedText>
                        <ThemedText style={styles.description}>
                            Please enter the current mileage displayed on the car&#39;s odometer.
                            This information is required to finalize your rental.
                        </ThemedText>
                        <ThemedTextInput
                            keyboardType="number-pad"
                            onChangeText={onChangeMileage}
                            placeholder="Mileage"
                            value={mileage?.toString()}
                        />
                    </View>
                    <View style={styles.imageSection}>
                        <View>
                            <ThemedText variant="headingMedium">
                                Upload Photo
                            </ThemedText>
                            <ThemedText style={styles.description}>
                                To verify the mileage, upload a clear image of the car&#39;s odometer.
                                Ensure the photo is:
                            </ThemedText>
                            <CheckListItem>Clear and legible</CheckListItem>
                            <CheckListItem>Shows the complete odometer display</CheckListItem>
                            <CheckListItem>Includes the car&#39;s dashboard for context</CheckListItem>
                        </View>
                        <ImageUpload onImageCaptured={setImage} />
                    </View>
                </View>
                <PrimaryButton onPress={onNext} disabled={!mileage || !image}>
                    Next
                </PrimaryButton>
            </View>
        </ThemedView>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    content: {
        flex: 1,
        justifyContent: "space-between"
    },
    description: {
        color: theme.colors.textSecondary,
        marginBottom: 8
    },
    imageSection: {
        flex: 1,
        gap: 15,
        justifyContent: "space-between",
        marginBottom: 15
    },
    section: {
        gap: 4
    },
    sections: {
        flex: 1,
        gap: 30
    }
});
