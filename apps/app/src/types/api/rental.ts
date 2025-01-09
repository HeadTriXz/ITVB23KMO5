import type { APIGetDateFilters, APIGetNumericFilters, APIGetStringFilters } from "@/types/api/filter";
import type { APIGetCarResult } from "@/types/api/car";
import type { APIGetCustomerResult } from "@/types/api/customer";
import type { APIGetInspectionResult } from "@/types/api/inspection";
import type { PartialResponse } from "@/types/common";

/**
 * The date filters for a GET request for rentals.
 */
type APIGetRentalBodyDateFilters = "fromDate" | "toDate";

/**
 * The numeric filters for a GET request for rentals.
 */
type APIGetRentalBodyNumericFilters =
    "id"
    | "longitude"
    | "latitude"
    | "inspectionId"
    | "customerId"
    | "carId";

/**
 * The string filters for a GET request for rentals.
 */
type APIGetRentalBodyStringFilters = "code" | "state";

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

/**
 * The body of a GET request for rentals.
 */
export interface APIGetRentalBody extends
    APIGetDateFilters<APIGetRentalBodyDateFilters>,
    APIGetNumericFilters<APIGetRentalBodyNumericFilters>,
    APIGetStringFilters<APIGetRentalBodyStringFilters>
{
    /**
     * Whether to return only distinct results.
     */
    distinct?: boolean;

    /**
     * The page number of the results.
     */
    page?: number;

    /**
     * The number of results per page.
     */
    size?: number;

    /**
     * The fields to sort the results by (e.g., `["id,asc"]`).
     */
    sort?: Array<`${string},${"asc" | "desc"}`>
}

/**
 * The body of a POST request for a rental.
 */
export interface APIPostRentalBody {
    /**
     * The car that was rented.
     */
    car: PartialResponse<APIGetCarResult>;

    /**
     * The customer who rented the car.
     */
    customer: PartialResponse<APIGetCustomerResult>;

    /**
     * The start date of the rental period.
     */
    fromDate: string;

    /**
     * The current location of the rental (latitude).
     */
    latitude: number;

    /**
     * The current location of the rental (longitude).
     */
    longitude: number;

    /**
     * The state of the rental.
     */
    state: string;

    /**
     * The end date of the rental period.
     */
    toDate: string;
}
