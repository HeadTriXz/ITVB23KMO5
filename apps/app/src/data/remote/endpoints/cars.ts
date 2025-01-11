import type { APIGetCarResult, APIGetCarsBody } from "@/types/api";
import type { RESTClient } from "@/data/remote/client";

/**
 * Represents the cars endpoint of the API.
 */
export class CarsAPI {
    /**
     * The REST client used to make requests.
     * @private
     */
    readonly #rest: RESTClient;

    /**
     * Represents the cars endpoint of the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.#rest = rest;
    }

    /**
     * Get a car by its ID.
     *
     * @param id The ID of the car to fetch.
     * @returns The car with the given ID.
     */
    async getCar(id: number): Promise<APIGetCarResult> {
        return this.#rest.get(`/cars/${id}`, {
            auth: true
        });
    }

    /**
     * Get a list of cars.
     *
     * @param options The query options to filter the cars.
     * @returns A list of cars.
     */
    async getCars(options: APIGetCarsBody): Promise<APIGetCarResult[]> {
        return this.#rest.get("/cars", {
            auth: true,
            params: options
        });
    }
}
