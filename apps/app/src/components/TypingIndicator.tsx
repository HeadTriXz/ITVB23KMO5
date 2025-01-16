import type { Theme } from "@/types/theme";

import { StyleSheet, View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useTheme";

export function TypingIndicator() {
    const theme = useTheme();
    const styles = useStyles(theme);

    const dot1Opacity = useRef(new Animated.Value(0.3)).current;
    const dot2Opacity = useRef(new Animated.Value(0.3)).current;
    const dot3Opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const animateDots = () => {
            Animated.sequence([
                Animated.timing(dot1Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(dot1Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
                Animated.timing(dot2Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(dot2Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
                Animated.timing(dot3Opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(dot3Opacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
            ]).start(() => animateDots());
        };

        animateDots();
    }, [dot1Opacity, dot2Opacity, dot3Opacity]);

    return (
        <View style={styles.container}>
            <Image source="icon" style={styles.profileImage} />
            <View style={styles.content}>
                <View style={styles.dotsContainer}>
                    <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
                    <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
                    <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
                </View>
            </View>
        </View>
    );
}

const useStyles = (theme: Theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        padding: 10
    },
    content: {
        backgroundColor: theme.colors.card,
        borderRadius: 10,
        padding: 10
    },
    dot: {
        backgroundColor: theme.colors.textSecondary,
        borderRadius: 5,
        height: 8,
        marginHorizontal: 2,
        width: 8
    },
    dotsContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    profileImage: {
        borderRadius: 16,
        height: 32,
        width: 32
    }
});