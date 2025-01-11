import {
    AccountAPI,
    CarsAPI,
    CustomersAPI,
    InspectionsAPI,
    RentalsAPI
} from "@/data/remote/endpoints";
import type { RESTClient } from "@/data/remote/client";

/**
 * The service for handling HTTP requests to the API.
 */
export class API {
    /**
     * The account endpoint of the API.
     */
    readonly account: AccountAPI;

    /**
     * The cars endpoint of the API.
     */
    readonly cars: CarsAPI;

    /**
     * The customers endpoint of the API.
     */
    readonly customers: CustomersAPI;

    /**
     * The inspections endpoint of the API.
     */
    readonly inspections: InspectionsAPI;

    /**
     * The rentals endpoint of the API.
     */
    readonly rentals: RentalsAPI;

    /**
     * The REST client used to make requests.
     */
    readonly rest: RESTClient;

    /**
     * The service for handling HTTP requests to the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.rest = rest;

        this.account = new AccountAPI(rest);
        this.cars = new CarsAPI(rest);
        this.customers = new CustomersAPI(rest);
        this.inspections = new InspectionsAPI(rest);
        this.rentals = new RentalsAPI(rest);
    }
}
