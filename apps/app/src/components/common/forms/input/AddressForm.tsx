import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedTextInput } from "@/components/base";

export interface Address {
    city: string;
    postalCode: string;
    province: string;
    street: string;
}

interface AddressFormProps {
    disabled?: boolean;
    onChange?: (address: Address) => void;
}

export function AddressForm({ disabled, onChange }: AddressFormProps) {
    const [address, setAddress] = useState<Address>({
        city: "",
        postalCode: "",
        province: "",
        street: ""
    });

    useEffect(() => {
        onChange?.(address);
    }, [address, onChange]);

    return (
        <View style={styles.container}>
            <ThemedTextInput
                disabled={disabled}
                placeholder="Street Address"
                value={address.street}
                onChangeText={(text) => setAddress({ ...address, street: text })}
            />
            <ThemedTextInput
                disabled={disabled}
                placeholder="Province"
                value={address.province}
                onChangeText={(text) => setAddress({ ...address, province: text })}
            />
            <View style={styles.row}>
                <ThemedTextInput
                    disabled={disabled}
                    placeholder="City"
                    style={styles.cityInput}
                    value={address.city}
                    onChangeText={(text) => setAddress({ ...address, city: text })}
                />
                <ThemedTextInput
                    disabled={disabled}
                    placeholder="Postal Code"
                    style={styles.postalCodeInput}
                    value={address.postalCode}
                    onChangeText={(text) => setAddress({ ...address, postalCode: text })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cityInput: {
        flex: 1,
        width: undefined
    },
    container: {
        gap: 15
    },
    postalCodeInput: {
        width: 150
    },
    row: {
        flexDirection: "row",
        gap: 15
    }
});
