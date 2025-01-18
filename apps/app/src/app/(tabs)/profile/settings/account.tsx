import type { APIGetAccountResult } from "@/types/api";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";

import { ActionButton } from "@/components/common/buttons/ActionButton";
import { EditEmailModal } from "@/components/common/modals/EditEmailModal";
import { EditNameModal } from "@/components/common/modals/EditNameModal";
import { EditPasswordModal } from "@/components/common/modals/EditPasswordModal";
import { ErrorBox } from "@/components/common";
import { Header } from "@/components/layout/header";
import { useAccount } from "@/hooks/account/useAccount";
import { useEditAccount } from "@/hooks/account/useEditAccount";
import { useEditPassword } from "@/hooks/account/useEditPassword";
import { useState } from "react";

type EditField = "email" | "name" | "password";
type UpdateFunction = (prev: APIGetAccountResult) => Promise<void>;

export default function AccountSettingsScreen() {
    const { account, error: accountError, isLoading } = useAccount();
    const { editAccountAsync } = useEditAccount();
    const { editPasswordAsync } = useEditPassword();

    const [editField, setEditField] = useState<EditField | null>(null);
    const [error, setError] = useState("");

    const handleError = (err: unknown, fallback: string) => {
        if (err instanceof Error) {
            return setError(err.message);
        }

        setError(fallback);
    }

    const handleUpdate = async (updateFn: UpdateFunction, errorMessage: string) => {
        if (isLoading || !account) {
            return;
        }

        setError("");
        return updateFn(account)
            .then(() => setEditField(null))
            .catch((err: unknown) => handleError(err, errorMessage));
    }

    const onShowModal = (field: EditField) => {
        setError("");
        setEditField(field);
    }

    const onUpdateName = async (firstName: string, lastName: string) => {
        return handleUpdate((prev) => editAccountAsync({
            ...prev,
            firstName: firstName,
            lastName: lastName
        }), "Failed to update name.");
    };

    const onUpdateEmail = async (email: string) => {
        return handleUpdate((prev) => editAccountAsync({
            ...prev,
            email: email
        }), "Failed to update email.");
    };

    const onUpdatePassword = async (current: string, newPass: string) => {
        return handleUpdate(() => editPasswordAsync({
            currentPassword: current,
            newPassword: newPass
        }), "Failed to update password.");
    };

    if (accountError) {
        return (
            <ThemedView style={styles.container}>
                <Header title="Account" withBackButton />
                <ErrorBox message={accountError.message} />
            </ThemedView>
        );
    }

    if (isLoading || !account) {
        return (
            <ThemedView style={styles.container}>
                <Header title="Account" withBackButton />
                <ActivityIndicator />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Account" withBackButton />
            <View style={styles.content}>
                {error && <ErrorBox message={error} />}

                <View>
                    <ThemedText variant="headingMedium" style={styles.heading}>
                        Personal Information
                    </ThemedText>

                    <View style={styles.settings}>
                        <ActionButton
                            onPress={() => onShowModal("name")}
                            subtitle={`${account.firstName} ${account.lastName}`}
                        >
                            Name
                        </ActionButton>
                        <ActionButton onPress={() => onShowModal("email")} subtitle={account.email}>
                            Email
                        </ActionButton>
                    </View>
                </View>

                <View>
                    <ThemedText variant="headingMedium" style={styles.heading}>
                        How to Sign In?
                    </ThemedText>

                    <ActionButton onPress={() => onShowModal("password")}>
                        Change Password
                    </ActionButton>
                </View>

                <EditNameModal
                    error={error}
                    isVisible={editField === "name"}
                    firstName={account.firstName}
                    lastName={account.lastName}
                    onClose={() => setEditField(null)}
                    onConfirm={onUpdateName}
                />
                <EditEmailModal
                    error={error}
                    isVisible={editField === "email"}
                    loading={isLoading}
                    onClose={() => setEditField(null)}
                    onConfirm={onUpdateEmail}
                    value={account.email}
                />
                <EditPasswordModal
                    error={error}
                    isVisible={editField === "password"}
                    loading={isLoading}
                    onClose={() => setEditField(null)}
                    onConfirm={onUpdatePassword}
                />
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 100
    },
    content: {
        flex: 1,
        gap: 45
    },
    heading: {
        marginBottom: 10
    },
    settings: {
        gap: 15
    }
});
