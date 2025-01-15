import { useLocalSearchParams, useRouter } from "expo-router";
import { BookingSelectDate } from "@/components/booking/screens";

export default function HomeSelectDateScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const onPress = (fromDate: string, toDate: string) => {
        router.push({
            pathname: "/(tabs)/favorites/(car)/[id]/overview",
            params: { id, fromDate, toDate }
        });
    }

    return <BookingSelectDate carId={Number(id)} button={{ onPress }} />;
}
