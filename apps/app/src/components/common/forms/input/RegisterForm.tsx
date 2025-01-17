import { StyleSheet } from "react-native";
import { ThemedTextInput } from "@/components/base";
import { View } from "react-native";

interface RegisterFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps {
    value: RegisterFormData;
    onChange: (value: RegisterFormData) => void;
}

export function RegisterForm({ value, onChange }: RegisterFormProps) {
    return (
        <View style={styles.container}>
            <View style={styles.nameFields}>
                <ThemedTextInput
                    value={value.firstName}
                    onChangeText={(firstName) => onChange({ ...value, firstName })}
                    placeholder="First Name"
                    style={styles.nameField}
                />
                <ThemedTextInput
                    value={value.lastName}
                    onChangeText={(lastName) => onChange({ ...value, lastName })}
                    placeholder="Last Name"
                    style={styles.nameField}
                />
            </View>

            <ThemedTextInput
                value={value.username}
                onChangeText={(username) => onChange({ ...value, username })}
                placeholder="Username"
                autoCapitalize="none"
            />
            <ThemedTextInput
                value={value.email}
                onChangeText={(email) => onChange({ ...value, email })}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <ThemedTextInput
                value={value.password}
                onChangeText={(password) => onChange({ ...value, password })}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry
            />
            <ThemedTextInput
                value={value.confirmPassword}
                onChangeText={(confirmPassword) => onChange({ ...value, confirmPassword })}
                placeholder="Confirm password"
                autoCapitalize="none"
                secureTextEntry
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        gap: 15
    },
    nameField: {
        flex: 1
    },
    nameFields: {
        flexDirection: "row",
        gap: 15
    }
});
