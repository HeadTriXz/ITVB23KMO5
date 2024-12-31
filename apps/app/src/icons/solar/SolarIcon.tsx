import type { ReactElement } from "react";

import { SolarBold } from "@/icons/solar/SolarBold";
import { SolarBoldDuotone } from "@/icons/solar/SolarBoldDuotone";
import { SolarOutline } from "@/icons/solar/SolarOutline";

/**
 * The variant of the Solar icon.
 */
export type SolarIconVariant = "bold" | "duotone" | "outline";

/**
 * The options for a Solar icon.
 */
export interface SolarIconProps {
    /**
     * The name of the icon.
     */
    name: string;

    /**
     * The size of the icon.
     */
    size?: number;

    /**
     * The color of the icon.
     */
    color?: string;

    /**
     * The variant of the icon.
     */
    variant?: SolarIconVariant;
}

/**
 * A Solar icon.
 *
 * @param name The name of the icon.
 * @param size The size of the icon.
 * @param color The color of the icon.
 * @param variant The variant of the icon.
 */
export function SolarIcon({
    name,
    size = 24,
    color = "#000000",
    variant = "bold"
}: SolarIconProps): ReactElement {
    switch (variant) {
        case "bold":
            return <SolarBold name={name} size={size} color={color} />;
        case "duotone":
            return <SolarBoldDuotone name={name} size={size} color={color} />;
        case "outline":
            return <SolarOutline name={name} size={size} color={color} />;
    }
}
