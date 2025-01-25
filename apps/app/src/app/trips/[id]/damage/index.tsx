import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";
import { useLocalSearchParams, useRouter } from "expo-router";

import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { ImageUpload } from "@/components/ImageUpload";
import { PrimaryButton } from "@/components/common/buttons";
import { useData } from "@/hooks/useData";
import { useRental } from "@/hooks/rentals/useRental";
import { useState } from "react";

export default function TripReportDamageScreen() {
    const router = useRouter();

    const { api } = useData();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { error: rentalError, isLoading, rental } = useRental(Number(id));

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);

    const onSubmit = async () => {
        if (!api || !rental || !description || !image) {
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            await api.inspections.createInspection({
                car: { id: rental.car.id },
                rental: { id: rental.id },
                description: description,
                photo: image,
                photoContentType: "image/jpeg"
            });

            router.replace(`/trips/${id}/damage/success`);
        } catch {
            setError("Failed to submit damage report.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (rentalError) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ThemedText>{rentalError.message}</ThemedText>
            </ThemedView>
        );
    }

    if (isLoading || !rental) {
        return (
            <ThemedView style={styles.container}>
                <Header withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Report Damage" withBackButton />
            <View style={styles.contentContainer}>
                {error && <ErrorBox message={error} />}
                <View style={styles.section}>
                    <ThemedText variant="headingMedium">
                        Description of Damage
                    </ThemedText>
                    <ThemedTextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe the damage"
                        style={styles.input}
                        multiline
                    />
                </View>
                <View style={styles.section}>
                    <ThemedText variant="headingMedium">
                        Upload Photos
                    </ThemedText>
                    <ImageUpload onImageCaptured={setImage} />
                </View>
                <PrimaryButton onPress={onSubmit} loading={isSubmitting} disabled={!description || !image}>
                    Submit
                </PrimaryButton>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    contentContainer: {
        flex: 1,
        gap: 30
    },
    input: {
        flex: 1,
        paddingTop: 13,
        textAlignVertical: "top"
    },
    section: {
        flex: 1,
        gap: 15
    }
});
