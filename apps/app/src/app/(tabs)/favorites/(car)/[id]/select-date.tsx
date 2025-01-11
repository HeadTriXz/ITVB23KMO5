import { BookingSelectDate } from "@/components/screens/booking";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function HomeSelectDateScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const onNext = (fromDate: string, toDate: string) => {
        router.push({
            pathname: "/(tabs)/favorites/(car)/[id]/overview",
            params: { id, fromDate, toDate }
        });
    }

    return <BookingSelectDate carId={Number(id)} onNext={onNext} />;
}
