import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "AutoMaat",
    slug: "AutoMaat",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "automaat",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive_icon.png",
            backgroundColor: "#FFFFFF"
        },
        package: "com.headtrixz.automaat",
        softwareKeyboardLayoutMode: "pan"
    },
    plugins: [
        [
            "expo-asset",
            {
                "assets": [
                    "./assets/images/icon.png",
                    "./assets/images/logo.png",
                    "./assets/images/logo_dark.png",
                    "./assets/images/brands/bmw.png",
                    "./assets/images/brands/mercedes.png",
                    "./assets/images/brands/nissan.png",
                    "./assets/images/brands/toyota.png",
                    "./assets/images/brands/bmw_dark.png",
                    "./assets/images/brands/mercedes_dark.png",
                    "./assets/images/brands/nissan_dark.png",
                    "./assets/images/brands/toyota_dark.png"
                ]
            }
        ],
        [
            "expo-font",
            {
                "fonts": [
                    "./assets/fonts/Inter-Regular.otf",
                    "./assets/fonts/Inter-Medium.otf",
                    "./assets/fonts/Inter-SemiBold.otf",
                    "./assets/fonts/Inter-Bold.otf",
                    "./assets/icomoon/Solar-Bold/Solar-Bold.ttf",
                    "./assets/icomoon/Solar-Outline/Solar-Outline.ttf"
                ]
            }
        ],
        "expo-router",
        "expo-secure-store",
        [
            "expo-splash-screen",
            {
                "backgroundColor": "#FFFFFF",
                "image": "./assets/images/splash_icon.png",
                "imageWidth": 200,
                "dark": {
                    "backgroundColor": "#000000",
                    "image": "./assets/images/splash_icon_dark.png"
                }
            }
        ],
        "expo-sqlite"
    ],
    experiments: {
        typedRoutes: true
    }
});
