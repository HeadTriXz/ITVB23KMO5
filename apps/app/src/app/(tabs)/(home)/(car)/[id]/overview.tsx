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

    return (
        <BookingOverview
            id={Number(params.id)}
            fromDate={params.fromDate}
            toDate={params.toDate}
            onSuccess={() => router.replace("/(tabs)/(home)/(car)/success")}
        />
    );
}
