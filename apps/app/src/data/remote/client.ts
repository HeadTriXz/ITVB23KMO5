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

    /**
     * The parameters of the request.
     */
    params?: Record<string, any>;
}

/**
 * A client for making requests to the REST API.
 */
export class RESTClient {
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
     * A client for making requests to the REST API.
     *
     * @param baseURL The base URL of the API.
     */
    constructor(baseURL: string) {
        this.#baseURL = baseURL;
    }

    /**
     * Makes a DELETE request to the API.
     *
     * @param url The URL of the request.
     * @param options The options for the request.
     * @returns The response from the API.
     */
    async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("DELETE", url, options);
    }

    /**
     * Makes a GET request to the API.
     *
     * @param url The URL of the request.
     * @param options The options for the request.
     * @returns The response from the API.
     */
    async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("GET", url, options);
    }

    /**
     * Makes a PATCH request to the API.
     *
     * @param url The URL of the request.
     * @param options The options for the request.
     * @returns The response from the API.
     */
    async patch<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("PATCH", url, options);
    }

    /**
     * Makes a POST request to the API.
     *
     * @param url The URL of the request.
     * @param options The options for the request.
     * @returns The response from the API.
     */
    async post<T>(url: string, options: RequestOptions = {}): Promise<T> {
        return this.#request("POST", url, options);
    }

    /**
     * Sets the token for authenticating requests to the API.
     *
     * @param token The token for authenticating requests.
     */
    setToken(token: string | null): void {
        this.#token = token;
    }

    /**
     * Makes a request to the API.
     *
     * @param method The HTTP method of the request.
     * @param path The path of the request.
     * @param options The options for the request.
     * @returns The response from the API.
     * @private
     */
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
            options.body = JSON.stringify(options.body);
            headers.append("Content-Type", "application/json");
        }

        if (options.params) {
            for (const [key, value] of Object.entries(options.params)) {
                if (value !== undefined) {
                    url.searchParams.append(key, String(value));
                }
            }
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: options.body as string
        });

        if (response.headers.get("Content-Type") === "application/problem+json") {
            const data = await response.json() as T;

            throw new Error((data as any).detail || "Request failed.");
        }

        if (response.headers.get("Content-Type") === "application/json") {
            return response.json() as T;
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        if (response.status === 204) {
            return null as T;
        }

        throw new Error("Unexpected response from the server.");
    }
}
