import { BookingSelectDate } from "@/components/booking/screens";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function HomeSelectDateScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const onNext = (fromDate: string, toDate: string) => {
        router.push({
            pathname: "/(tabs)/(home)/(car)/[id]/overview",
            params: { id, fromDate, toDate }
        });
    }

    return <BookingSelectDate carId={Number(id)} onNext={onNext} />;
}
