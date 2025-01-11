import { useLocalSearchParams, useRouter } from "expo-router";
import { AvailableCarDetails } from "@/components/booking/screens/AvailableCarDetails";

export default function CarDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const onBook = () => {
        router.push(`/(tabs)/favorites/(car)/${id}/select-date`);
    };

    return <AvailableCarDetails id={id} onBook={onBook} />;
}
