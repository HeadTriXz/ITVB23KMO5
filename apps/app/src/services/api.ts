import type {
    APIGetAccountResult,
    APIGetCarResult,
    APIGetCarsBody,
    APIGetCustomerResult,
    APIGetRentalBody,
    APIGetRentalResult,
    APIPostLoginBody,
    APIPostLoginResult,
    APIPostRegisterBody,
    APIPostRentalBody
} from "@/types/api";

/**
 * The options for a request to the API.
 */
export interface RequestOptions {
    /**
     * Whether the request requires authentication.
     */
    auth?: boolean;

    /**
     * The body of the request.
     */
    body?: any;
}

/**
 * The service for handling HTTP requests to the API.
 */
export class APIService {
    /**
     * The base URL of the API.
     * @private
     */
    readonly #baseURL: string;

    /**
     * The token for authenticating requests to the API.
     * @private
     */
    #token: string | null = null;

    /**
     * The service for handling HTTP requests to the API.
     *
     * @param baseURL The base URL of the API.
     */
    constructor(baseURL: string) {
        this.#baseURL = baseURL;
    }

    async createRental(options: APIPostRentalBody): Promise<void> {
        await this.#post("/rentals", {
            auth: true,
            body: options
        });
    }

    async getAccount(): Promise<APIGetAccountResult> {
        return this.#get("/account", {
            auth: true
        });
    }

    async getCar(id: number): Promise<APIGetCarResult> {
        return this.#get(`/cars/${id}`, {
            auth: true
        });
    }

    async getCars(options: APIGetCarsBody = {}): Promise<APIGetCarResult[]> {
        return this.#get("/cars", {
            auth: true,
            body: options
        });
    }

    async getCustomer(): Promise<APIGetCustomerResult> {
        return this.#get("/AM/me", {
            auth: true
        });
    }

    async getRentals(options: APIGetRentalBody): Promise<APIGetRentalResult[]> {
        return this.#get("/rentals", {
            auth: true,
            body: options
        });
    }

    async loginUser(options: APIPostLoginBody): Promise<APIPostLoginResult> {
        return this.#post("/authenticate", {
            body: options
        });
    }

    async registerUser(options: APIPostRegisterBody): Promise<void> {
        await this.#post("/register", {
            body: options
        });
    }

    setToken(token: string): void {
        this.#token = token;
    }

    async #get<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("GET", url, options);
    }

    async #post<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("POST", url, options);
    }

    async #request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
        const headers = new Headers();
        const url = new URL(`${this.#baseURL}${path}`);

        if (options.auth) {
            if (!this.#token) {
                throw new Error("The user is not authenticated.");
            }

            headers.append("Authorization", `Bearer ${this.#token}`);
        }

        if (options.body) {
            if (method === "GET") {
                for (const key in options.body) {
                    url.searchParams.append(key, options.body[key]);
                }

                delete options.body;
            } else {
                options.body = JSON.stringify(options.body);
                headers.append("Content-Type", "application/json");
            }
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: options.body as string
        });

        if (response.headers.get("Content-Type") === "application/json") {
            return response.json() as Promise<T>;
        }

        throw new Error("Unexpected response from the server.");
    }
}
