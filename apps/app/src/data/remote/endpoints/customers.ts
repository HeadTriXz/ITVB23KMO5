import type { APIGetCustomerResult } from "@/types/api";
import type { RESTClient } from "@/data/remote/client";

/**
 * Represents the customers endpoint of the API.
 */
export class CustomersAPI {
    /**
     * The REST client used to make requests.
     * @private
     */
    readonly #rest: RESTClient;

    /**
     * Represents the customers endpoint of the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.#rest = rest;
    }

    /**
     * Retrieves the authenticated customer's information.
     *
     * @returns The customer information.
     */
    async getCustomer(): Promise<APIGetCustomerResult> {
        return this.#rest.get("/AM/me", {
            auth: true
        });
    }
}
