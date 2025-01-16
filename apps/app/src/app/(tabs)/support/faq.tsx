import { FlatList, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { Header } from "@/components/layout/header";
import { FREQUENTLY_ASKED_QUESTIONS } from "@/constants/faq";
import { FAQCard } from "@/components/cards/FAQCard";

export default function SupportFAQScreen() {
    return (
        <ThemedView style={styles.container}>
            <Header title="Support" withBackButton />
            <ThemedText variant="headingMedium" style={styles.heading}>
                FAQ
            </ThemedText>
            <FlatList
                data={FREQUENTLY_ASKED_QUESTIONS}
                renderItem={({ item }) => (
                    <FAQCard answer={item.answer} question={item.question} />
                )}
                contentContainerStyle={styles.contentContainer}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingBottom: 76
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 25
    },
    heading: {
        marginBottom: 10
    }
});
