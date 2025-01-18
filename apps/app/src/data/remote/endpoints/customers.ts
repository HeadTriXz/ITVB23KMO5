import type { APIGetCustomerResult, APIPatchCustomerBody } from "@/types/api";
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
     * Edits a customer.
     *
     * @param id The ID of the customer.
     * @param options The options for the request.
     */
    async editCustomer(id: number, options: APIPatchCustomerBody): Promise<void> {
        await this.#rest.patch(`/customers/${id}`, {
            auth: true,
            body: { id, ...options }
        });
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
