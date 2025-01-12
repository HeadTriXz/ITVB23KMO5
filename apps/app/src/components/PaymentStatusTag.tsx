import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/base";
import { SolarOutline } from "@/components/icons/solar";

interface PaymentStatusTagProps {
    backgroundColor: string;
    color: string;
    status: string;
}

export function PaymentStatusTag(props: PaymentStatusTagProps) {
    const styles = useStyles(props);

    return (
        <View style={styles.container}>
            <SolarOutline name="wallet-money" size={24} color={props.color} />
            <ThemedText style={styles.text}>{props.status}</ThemedText>
        </View>
    );
}

export function PaidTag() {
    return <PaymentStatusTag backgroundColor="#00FF2930" color="#00B912" status="Paid" />;
}

export function PendingTag() {
    return <PaymentStatusTag backgroundColor="#FF890030" color="#CB7A00" status="Pending" />;
}

export function OverdueTag() {
    return <PaymentStatusTag backgroundColor="#FF000030" color="#BF0000" status="Overdue" />;
}

const useStyles = (props: PaymentStatusTagProps) => StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: props.backgroundColor,
        borderColor: props.color,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    text: {
        color: props.color
    }
});
