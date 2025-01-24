import type { Theme } from "@/types/theme";

import { Modal, StyleSheet, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "@/components/common/buttons";
import { ThemedText, ThemedTextInput, ThemedView } from "@/components/base";

import { ErrorBox } from "@/components/common";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

interface EditNameModalProps {
    error?: string;
    firstName: string;
    isVisible: boolean;
    lastName: string;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (firstName: string, lastName: string) => Promise<void>;
}

export function EditNameModal({
    error,
    firstName,
    isVisible,
    lastName,
    loading,
    onClose,
    onConfirm
}: EditNameModalProps) {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [first, setFirst] = useState(firstName);
    const [last, setLast] = useState(lastName);

    const onDismiss = () => {
        setFirst(firstName);
        setLast(lastName);

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
                        Change Name
                    </ThemedText>

                    {error && (
                        <ErrorBox message={error} style={styles.error} />
                    )}

                    <View style={styles.form}>
                        <ThemedTextInput
                            value={first}
                            onChangeText={setFirst}
                            placeholder="First Name"
                        />
                        <ThemedTextInput
                            value={last}
                            onChangeText={setLast}
                            placeholder="Last Name"
                        />
                    </View>

                    <View style={styles.buttons}>
                        <PrimaryButton
                            loading={loading}
                            onPress={() => onConfirm(first, last)}
                            style={styles.button}
                        >
                            Save
                        </PrimaryButton>
                        <SecondaryButton
                            onPress={onDismiss}
                            disabled={loading}
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
