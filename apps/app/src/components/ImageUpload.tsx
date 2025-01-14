import type { Theme } from "@/types/theme";

import { Camera, PermissionStatus } from "expo-camera";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { SolarBoldDuotone } from "@/components/icons/solar";
import { ThemedText } from "@/components/base";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

import * as ImagePicker from "expo-image-picker";

interface ImageUploadProps {
    onImageCaptured: (base64: string) => void;
}

export function ImageUpload({ onImageCaptured }: ImageUploadProps) {
    const theme = useTheme();
    const styles = useStyles(theme);
    const [image, setImage] = useState<string | null>(null);

    const takePhoto = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== PermissionStatus.GRANTED) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (!result.canceled && result.assets[0].base64) {
            setImage(result.assets[0].uri);
            onImageCaptured(result.assets[0].base64);
        }
    };

    return (
        <Pressable onPress={takePhoto} style={styles.container}>
            {image ? (
                <Image source={{ uri: image }} style={styles.preview} />
            ) : (
                <View style={styles.placeholder}>
                    <SolarBoldDuotone
                        name="camera"
                        size={36}
                        color={theme.colors.textPrimary}
                    />
                    <ThemedText style={styles.text}>
                        Tap to take photo
                    </ThemedText>
                </View>
            )}
        </Pressable>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        marginTop: 10,
        maxHeight: 200,
        overflow: "hidden"
    },
    placeholder: {
        alignItems: "center",
        flex: 1,
        gap: 8,
        justifyContent: "center"
    },
    preview: {
        flex: 1
    },
    text: {
        color: theme.colors.textSecondary
    }
});

