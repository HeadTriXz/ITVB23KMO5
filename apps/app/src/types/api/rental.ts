import { APIGetCarResult } from "@/types/api/car";
import { APIGetCustomerResult } from "@/types/api/customer";
import { APIGetInspectionResult } from "@/types/api/inspection";
import { PartialResponse } from "@/types/common";

/**
 * The response of a GET request for a rental.
 */
export interface APIGetRentalResult {
    /**
     * The unique identifier of the rental.
     */
    id: number;

    /**
     * The code of the rental.
     */
    code: string;

    /**
     * The longitude coordinate of the rental location.
     */
    longitude: number;

    /**
     * The latitude coordinate of the rental location.
     */
    latitude: number;

    /**
     * The start date of the rental period.
     */
    fromDate: string;

    /**
     * The end date of the rental period.
     */
    toDate: string;

    /**
     * The current state of the rental (e.g., active, returned, pickup, reserved).
     */
    state: string;

    /**
     * The inspections associated with the rental.
     */
    inspections: APIGetInspectionResult[] | null;

    /**
     * The customer who made the rental.
     */
    customer: PartialResponse<APIGetCustomerResult> | null;

    /**
     * The car that was rented.
     */
    car: PartialResponse<APIGetCarResult> | null;
}
