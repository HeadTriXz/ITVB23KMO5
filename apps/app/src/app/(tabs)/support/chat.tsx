import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "@/components/base";
import { useRef, useState } from "react";

import { ChatInput } from "@/components/common/forms/input/ChatInput";
import { Header } from "@/components/layout/header";
import { SolarBoldDuotone } from "@/components/icons/solar";
import { SupportMessage } from "@/components/SupportMessage";
import { TypingIndicator } from "@/components/TypingIndicator";
import { UserMessage } from "@/components/UserMessage";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { useTheme } from "@/hooks/useTheme";

import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface Message {
    author: "user" | "support";
    content: string;
    createdAt: number;
}

const DEFAULT_SUPPORT_MESSAGE = "Thank you for reaching out to our support team! Unfortunately, there are no employees available at the moment. Please try again later.";

const useGradualAnimation = () => {
    const height = useSharedValue(0);
    useKeyboardHandler({
        onMove: (event) => {
            'worklet';
            height.value = Math.max(event.height, 0);
        }
    }, []);

    return { height };
};

export default function SupportLiveChatScreen() {
    const theme = useTheme();
    const scrollRef = useRef<ScrollView>(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [hasMessage, setHasMessage] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { height } = useGradualAnimation();

    const fakeView = useAnimatedStyle(() => ({
        height: Math.abs(height.value) - 85,
    }), []);

    const onSend = (message: string) => {
        setMessages((prev) => [...prev, {
            author: "user",
            content: message,
            createdAt: Date.now()
        }]);

        if (!hasMessage) {
            setHasMessage(true);
            setIsTyping(true);

            setTimeout(() => {
                setMessages((prev) => [...prev, {
                    author: "support",
                    content: DEFAULT_SUPPORT_MESSAGE,
                    createdAt: Date.now()
                }]);

                setIsTyping(false);
            }, 2000 + Math.random() * 4000);
        }
    }

    return (
        <ThemedView style={styles.container}>
            <Header title="Support" withBackButton />
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                style={styles.scrollContainer}
            >
                <View style={styles.heading}>
                    <SolarBoldDuotone name="dialog" size={100} color={theme.colors.textPrimary} />
                    <ThemedText variant="headingLarge" style={styles.headingText}>
                        How can we help you?
                    </ThemedText>
                </View>
                <View style={styles.contentContainer}>
                    {messages.map((message, index) => (
                        message.author === "user" ? (
                            <UserMessage key={index} content={message.content} createdAt={message.createdAt} />
                        ) : (
                            <SupportMessage key={index} content={message.content} createdAt={message.createdAt} />
                        )
                    ))}
                    {isTyping && <TypingIndicator />}
                </View>
            </ScrollView>
            <ChatInput onSend={onSend} style={styles.input} />
            <Animated.View style={fakeView} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 94,
        paddingHorizontal: 16
    },
    contentContainer: {
        flex: 1,
        gap: 15,
        paddingBottom: 67
    },
    heading: {
        alignItems: "center",
        marginBottom: 40
    },
    headingText: {
        maxWidth: "80%",
        textAlign: "center"
    },
    input: {
        marginTop: -10
    },
    scrollContainer: {
        flex: 1,
        paddingTop: 40
    }
});
