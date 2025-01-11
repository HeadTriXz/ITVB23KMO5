import type {
    APIGetAccountResult,
    APIGetActivateBody,
    APIPostChangePasswordBody,
    APIPostLoginBody,
    APIPostLoginResult,
    APIPostRegisterBody,
    APIPostResetPasswordFinishBody
} from "@/types/api";
import type { RESTClient } from "@/data/remote/client";

/**
 * Represents the account endpoint of the API.
 */
export class AccountAPI {
    /**
     * The REST client used to make requests.
     * @private
     */
    readonly #rest: RESTClient;

    /**
     * Represents the account endpoint of the API.
     *
     * @param rest The REST client used to make requests.
     */
    constructor(rest: RESTClient) {
        this.#rest = rest;
    }

    /**
     * Activates an account.
     *
     * @param options The options for the request.
     */
    async activateAccount(options: APIGetActivateBody) {
        await this.#rest.get("/activate", {
            params: options
        });
    }

    /**
     * Changes the password of the account.
     *
     * @param options The options for the request.
     */
    async changePassword(options: APIPostChangePasswordBody): Promise<void> {
        await this.#rest.post("/account/change-password", {
            auth: true,
            body: options
        });
    }

    /**
     * Finishes the password reset process.
     *
     * @param options The options for the request.
     */
    async finishPasswordReset(options: APIPostResetPasswordFinishBody): Promise<void> {
        await this.#rest.post("/account/reset-password/finish", {
            body: options
        });
    }

    /**
     * Gets the account details of the authenticated user.
     *
     * @returns The account details of the authenticated user.
     */
    async getAccount(): Promise<APIGetAccountResult> {
        return this.#rest.get("/account", {
            auth: true
        });
    }

    /**
     * Initializes the password reset process.
     *
     * @param email The email of the user.
     */
    async initPasswordReset(email: string): Promise<void> {
        await this.#rest.post("/account/reset-password/init", {
            body: email
        });
    }

    /**
     * Logs in the user.
     *
     * @param options The options for the request.
     * @returns The token of the user.
     */
    async loginUser(options: APIPostLoginBody): Promise<APIPostLoginResult> {
        return this.#rest.post("/authenticate", {
            body: options
        });
    }

    /**
     * Registers a new user.
     *
     * @param options The options for the request.
     */
    async registerUser(options: APIPostRegisterBody): Promise<void> {
        await this.#rest.post("/AM/register", {
            body: options
        });
    }
}
