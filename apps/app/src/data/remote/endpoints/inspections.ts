import type { APIGetInspectionResult, APIPostInspectionBody } from "@/types/api";
import type { RESTClient } from "@/data/remote/client";

/**
 * Represents the inspections endpoint of the API.
 */
export class InspectionsAPI {
    /**
     * The REST client used to make requests.
     * @private
     */
    readonly #rest: RESTClient;

    /**
     * Represents the inspections endpoint of the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.#rest = rest;
    }

    /**
     * Gets a specific inspection.
     *
     * @param id The ID of the inspection.
     * @returns The inspection data.
     */
    async getInspection(id: number): Promise<APIGetInspectionResult> {
        return this.#rest.get(`/inspections/${id}`, {
            auth: true
        });
    }

    /**
     * Creates a new inspection.
     *
     * @param options The inspection data.
     * @returns The inspection data.
     */
    async createInspection(options: APIPostInspectionBody): Promise<APIGetInspectionResult> {
        return this.#rest.post("/inspections", {
            auth: true,
            body: options
        });
    }
}
