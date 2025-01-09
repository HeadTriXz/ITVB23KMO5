import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";

export default tseslint.config({
    files: ["src/**/*.{ts,tsx}"],
    extends: [
        eslint.configs.recommended,
        tseslint.configs.eslintRecommended,
        tseslint.configs.recommendedTypeChecked,
        {
            languageOptions: {
                parserOptions: {
                    projectService: true,
                    tsconfigRootDir: import.meta.dirname
                }
            }
        },
        tseslint.configs.recommended,
        {
            ...react.configs.flat.recommended,
            settings: {
                react: {
                    version: "detect"
                }
            }
        },
        {
            plugins: {
                "react-native": fixupPluginRules(reactNative)
            }
        }
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "react/display-name": "off",
        "react/react-in-jsx-scope": "off",
        "react-native/sort-styles": "error",
        "react-native/split-platform-components": "error",
        "react-native/no-inline-styles": "error",
        "react-native/no-single-element-style-arrays": "error"
    }
});
