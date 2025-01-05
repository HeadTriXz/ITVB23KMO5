import type { Theme, ThemeFonts } from "@/types/theme";

export const fonts: ThemeFonts = {
    headingLarge: {
        fontFamily: "Inter-Bold",
        fontSize: 32,
        lineHeight: 40
    },
    headingMedium: {
        fontFamily: "Inter-SemiBold",
        fontSize: 20,
        lineHeight: 28
    },
    headingSmall: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        lineHeight: 24
    },
    textBody: {
        fontFamily: "Inter-Regular",
        fontSize: 16,
        lineHeight: 24
    },
    textSmall: {
        fontFamily: "Inter-Regular",
        fontSize: 12,
        lineHeight: 16
    },
    link: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        lineHeight: 24
    }
}

export const lightTheme: Theme = {
    dark: false,
    colors: {
        background: "#F5F5F5",
        card: "#FFFFFF",
        textPrimary: "#1E1E1E",
        textSecondary: "#7F7F7F",
        accent: "#F76F53",
        buttonPrimary: "#000000",
        buttonSecondary: "#FFFFFF",
        buttonDisabled: "#E5E5E5",
        border: "#E5E5E5",
        navbar: "#000000"
    },
    fonts: fonts
}

export const darkTheme: Theme = {
    dark: true,
    colors: {
        background: "#000000",
        card: "#171717",
        textPrimary: "#FFFFFF",
        textSecondary: "#7F7F7F",
        accent: "#F76F53",
        buttonPrimary: "#FFFFFF",
        buttonSecondary: "#171717",
        buttonDisabled: "#272727",
        border: "#272727",
        navbar: "#171717"
    },
    fonts: fonts
}
