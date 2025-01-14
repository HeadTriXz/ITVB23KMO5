import type {
    APIGetRentalResult,
    APIGetRentalsBody,
    APIPatchRentalBody,
    APIPostRentalBody
} from "@/types/api";
import type { RESTClient } from "@/data/remote/client";

/**
 * Represents the rentals endpoint of the API.
 */
export class RentalsAPI {
    /**
     * The REST client used to make requests.
     * @private
     */
    readonly #rest: RESTClient;

    /**
     * Represents the rentals endpoint of the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.#rest = rest;
    }

    /**
     * Creates a new rental.
     *
     * @param options The rental data.
     * @returns The created rental.
     */
    async createRental(options: APIPostRentalBody): Promise<APIGetRentalResult> {
        return this.#rest.post("/rentals", {
            auth: true,
            body: options
        });
    }

    /**
     * Deletes a rental.
     *
     * @param id The ID of the rental.
     */
    async deleteRental(id: number): Promise<void> {
        return this.#rest.delete(`/rentals/${id}`, {
            auth: true
        });
    }

    /**
     * Edits a rental.
     *
     * @param id The ID of the rental.
     * @param options The rental data.
     * @returns The edited rental.
     */
    async editRental(id: number, options: APIPatchRentalBody): Promise<APIGetRentalResult> {
        return this.#rest.patch(`/rentals/${id}`, {
            auth: true,
            body: { ...options, id }
        });
    }

    /**
     * Gets a specific rental.
     *
     * @param id The ID of the rental.
     * @returns The rental.
     */
    async getRental(id: number): Promise<APIGetRentalResult> {
        return this.#rest.get(`/rentals/${id}`, {
            auth: true
        });
    }

    /**
     * Gets a list of rentals.
     *
     * @param options The query options to filter the rentals.
     * @returns The list of rentals.
     */
    async getRentals(options: APIGetRentalsBody): Promise<APIGetRentalResult[]> {
        return this.#rest.get("/rentals", {
            auth: true,
            params: options
        });
    }
}
