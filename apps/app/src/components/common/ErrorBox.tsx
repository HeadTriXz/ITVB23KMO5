import { type ViewStyle, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/base/ThemedText";

export interface ErrorBoxProps {
    message: string;
    style?: ViewStyle;
}

export const ErrorBox = ({ message, style }: ErrorBoxProps) => (
    <View style={[styles.container, style]}>
        <Ionicons name="warning-outline" size={24} color="#BF0000" />
        <ThemedText style={styles.text}>{message}</ThemedText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#FF000030",
        borderColor: "#BF0000",
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: "row",
        padding: 13,
        width: "100%"
    },
    text: {
        color: "#BF0000",
        flex: 1,
        marginLeft: 10
    },
});
