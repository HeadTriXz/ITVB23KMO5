import type { IconProps } from "@expo/vector-icons/build/createIconSet";
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
export interface SolarIconProps extends IconProps<string> {
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
 * @param props The additional props.
 */
export function SolarIcon({
    name,
    size = 24,
    color = "#000000",
    variant = "bold",
    ...props
}: SolarIconProps): ReactElement {
    switch (variant) {
        case "bold":
            return <SolarBold name={name} size={size} color={color} {...props} />;
        case "duotone":
            return <SolarBoldDuotone name={name} size={size} color={color} {...props} />;
        case "outline":
            return <SolarOutline name={name} size={size} color={color} {...props} />;
    }
}
