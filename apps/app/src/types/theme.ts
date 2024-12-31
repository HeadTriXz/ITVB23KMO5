export interface ThemeColors {
    background: string;
    card: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonDisabled: string;
    border: string;
    navbar: string;
}

export interface ThemeFontProps {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
}

export interface ThemeFonts {
    headingLarge: ThemeFontProps;
    headingMedium: ThemeFontProps;
    headingSmall: ThemeFontProps;
    textBody: ThemeFontProps;
    textSmall: ThemeFontProps;
    link: ThemeFontProps;
}

export interface Theme {
    colors: ThemeColors;
    dark: boolean;
    fonts: ThemeFonts;
}
