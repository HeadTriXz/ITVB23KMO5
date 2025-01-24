import type { Theme } from "@/types/theme";

import { Modal, StyleSheet, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "@/components/common/buttons";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { ErrorBox } from "@/components/common";
import { PasswordInput } from "@/components/common/forms";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface EditPasswordModalProps {
    error?: string;
    isVisible: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function EditPasswordModal({
    error,
    isVisible,
    loading,
    onClose,
    onConfirm
}: EditPasswordModalProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [modalError, setError] = useState<string>("");

    const onPress = () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        return onConfirm(currentPassword, newPassword);
    };

    const onDismiss = () => {
        setError("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        return onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent
            visible={isVisible}
            onRequestClose={onDismiss}
        >
            <ThemedView style={styles.overlay}>
                <ThemedView style={styles.content}>
                    <ThemedText variant="headingMedium" style={styles.title}>
                        Change Password
                    </ThemedText>

                    {(error || modalError) && (
                        <ErrorBox message={error || modalError} style={styles.error} />
                    )}

                    <View style={styles.form}>
                        <PasswordInput
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Current Password"
                        />
                        <ThemedTextInput
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="New Password"
                            secureTextEntry
                        />
                        <ThemedTextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm Password"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttons}>
                        <PrimaryButton onPress={onPress} loading={loading} style={styles.button}>
                            Save
                        </PrimaryButton>
                        <SecondaryButton onPress={onDismiss} disabled={loading} style={styles.button}>
                            Cancel
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
    error: {
        marginBottom: 16
    },
    form: {
        gap: 15
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
