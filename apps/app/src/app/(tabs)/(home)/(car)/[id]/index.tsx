import { AvailableCarDetails } from "@/components/screens/booking/AvailableCarDetails";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function CarDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const onBook = () => {
        router.push(`/(tabs)/(home)/(car)/${id}/select-date`);
    };

    return <AvailableCarDetails id={id} onBook={onBook} />;
}
