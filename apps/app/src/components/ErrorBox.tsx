import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/base/ThemedText";

export interface ErrorBoxProps {
    message: string;
}

export const ErrorBox = ({ message }: ErrorBoxProps) => (
    <View style={styles.container}>
        <Ionicons name="warning-outline" size={24} color="#BF0000" />
        <ThemedText style={styles.text}>{message}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF000050",
        borderColor: "#BF0000",
        borderWidth: 1,
        borderRadius: 7,
        padding: 13,
        width: "100%",
    },
    text: {
        color: "#BF0000",
        marginLeft: 10,
    },
});
