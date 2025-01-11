import { BookingOverview } from "@/components/screens/booking";
import { useLocalSearchParams, useRouter } from "expo-router";

type BookingOverviewParams = {
    id: string;
    fromDate?: string;
    toDate?: string;
};

export default function BookingOverviewScreen() {
    const params = useLocalSearchParams<BookingOverviewParams>();
    const router = useRouter();

    if (!params.fromDate || !params.toDate) {
        throw new Error("Missing required parameters.");
    }

    const onSuccess = () => {
        router.dismissAll();
        router.replace("/(tabs)/favorites/(car)/success");
    }

    return (
        <BookingOverview
            id={Number(params.id)}
            fromDate={params.fromDate}
            toDate={params.toDate}
            onSuccess={onSuccess}
        />
    );
}
