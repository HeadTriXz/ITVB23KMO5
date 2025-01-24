import type { Theme } from "@/types/theme";

import { Modal, StyleSheet, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "@/components/common/buttons";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { ErrorBox } from "@/components/common";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface EditEmailModalProps {
    error?: string;
    isVisible: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (email: string) => Promise<void>;
    value: string;
}

export function EditEmailModal({
    error,
    isVisible,
    loading,
    onClose,
    onConfirm,
    value
}: EditEmailModalProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [email, setEmail] = useState(value);

    const onDismiss = () => {
        setEmail(value);

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
                        Change Email
                    </ThemedText>

                    {error && (
                        <ErrorBox message={error} style={styles.error} />
                    )}

                    <View style={styles.form}>
                        <ThemedTextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.buttons}>
                        <PrimaryButton
                            loading={loading}
                            onPress={() => onConfirm(email)}
                            style={styles.button}
                        >
                            Save
                        </PrimaryButton>
                        <SecondaryButton
                            disabled={loading}
                            onPress={onDismiss}
                            style={styles.button}
                        >
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
