import type { ReactNode } from "react";
import type { Theme } from "@/types/theme";

import { Modal, StyleSheet, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { ThemedText, ThemedView } from "../../base";
import { useTheme } from "@/hooks/useTheme";

interface ConfirmationModalProps {
    cancelText?: string;
    children: ReactNode;
    confirmText?: string;
    isVisible: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

export function ConfirmationModal({
    cancelText = "Cancel",
    children,
    confirmText = "Confirm",
    isVisible,
    loading,
    onClose,
    onConfirm,
    title
}: ConfirmationModalProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    return (
        <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            onRequestClose={onClose}
        >
            <ThemedView style={styles.overlay}>
                <ThemedView style={styles.content}>
                    <ThemedText variant="headingMedium" style={styles.title}>
                        {title}
                    </ThemedText>
                    {children}
                    <View style={styles.buttons}>
                        <PrimaryButton onPress={onConfirm} loading={loading} style={styles.button}>
                            {confirmText}
                        </PrimaryButton>
                        <SecondaryButton onPress={onClose} disabled={loading} style={styles.button}>
                            {cancelText}
                        </SecondaryButton>
                    </View>
                </ThemedView>
            </ThemedView>
        </Modal>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    button: {
        flex: 1
    },
    buttons: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24
    },
    content: {
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        padding: 24,
        width: "100%"
    },
    overlay: {
        alignItems: "center",
        backgroundColor: "#00000080",
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    title: {
        marginBottom: 16
    }
});
