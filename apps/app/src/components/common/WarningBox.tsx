import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/base/ThemedText";

export interface WarningBoxProps {
    message: string;
}

export const WarningBox = ({ message }: WarningBoxProps) => (
    <View style={styles.container}>
        <Ionicons name="warning-outline" size={24} color="#CB7A00" />
        <ThemedText style={styles.text}>{message}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#FF890030",
        borderColor: "#CB7A00",
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: "row",
        padding: 13,
        width: "100%"
    },
    text: {
        color: "#CB7A00",
        flex: 1,
        marginLeft: 10
    },
});
