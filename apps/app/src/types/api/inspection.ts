import { APIGetCarResult } from "@/types/api/car";
import { APIGetCustomerResult } from "@/types/api/customer";
import { APIGetRentalResult } from "@/types/api/rental";
import { PartialResponse } from "@/types/common";

export interface APIGetInspectionResult {
    /**
     * The unique identifier of the inspection.
     */
    id: number;

    /**
     * The code of the inspection.
     */
    code: string;

    /**
     * The mileage of the car at the time of the inspection.
     */
    odometer: number;

    /**
     * The result of the inspection.
     */
    result: string;

    /**
     * The description of the inspection.
     */
    description: string;

    /**
     * A base64 encoded string representing the photo of the inspection.
     */
    photo: string;

    /**
     * The content type of the photo of the inspection.
     */
    photoContentType: string;

    /**
     * The date the inspection was completed.
     */
    completed: string;

    /**
     * The car that was inspected.
     */
    car: PartialResponse<APIGetCarResult> | null;

    /**
     * The employee that performed the inspection.
     */
    employee: PartialResponse<APIGetCustomerResult> | null;

    /**
     * The rental that the inspection is associated with.
     */
    rental: PartialResponse<APIGetRentalResult> | null;
}

/**
 * The payload for a POST request to create an inspection.
 */
export interface APIPostInspectionBody {
    /**
     * The code of the inspection.
     */
    code: string;

    /**
     * The mileage of the car at the time of the inspection.
     */
    odometer: number;

    /**
     * The result of the inspection.
     */
    result: string;

    /**
     * The description of the inspection.
     */
    description: string;

    /**
     * A base64 encoded string representing the photo of the inspection.
     */
    photo: string;

    /**
     * The content type of the photo of the inspection.
     */
    photoContentType: string;

    /**
     * The date the inspection was completed.
     */
    completed: string;

    /**
     * The unique identifier of the car that was inspected.
     */
    carId: number;

    /**
     * The unique identifier of the employee that performed the inspection.
     */
    employeeId: number;

    /**
     * The unique identifier of the rental associated with the inspection.
     */
    rentalId: number;
}
