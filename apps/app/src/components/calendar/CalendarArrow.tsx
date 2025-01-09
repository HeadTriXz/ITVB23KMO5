import { Ionicons } from "@expo/vector-icons";

interface CalendarArrowProps {
    color: string;
    direction: "left" | "right";
}

export function CalendarArrow({ color, direction }: CalendarArrowProps) {
    const icon = direction === "left" ? "chevron-back" : "chevron-forward";

    return <Ionicons name={icon} size={24} color={color} />;
}
