/**
 * The response of a GET request for a customer.
 */
export interface APIGetCustomerResult {
    /**
     * The unique identifier of the customer.
     */
    id: number;

    /**
     * The customer number.
     */
    nr: number;

    /**
     * The last name of the customer.
     */
    lastName: string;

    /**
     * The first name of the customer.
     */
    firstName: string;

    /**
     * When the customer has created an account.
     */
    from: string;
}

/**
 * The payload of a PATCH request to update a customer.
 */
export interface APIPatchCustomerBody {
    /**
     * The last name of the customer.
     */
    lastName?: string;

    /**
     * The first name of the customer.
     */
    firstName?: string;
}
