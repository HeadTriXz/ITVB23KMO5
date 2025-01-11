/**
 * The response of a GET request for account information.
 */
export interface APIGetAccountResult {
    /**
     * The unique identifier of the account.
     */
    id: number;

    /**
     * The login name of the account.
     */
    login: string;

    /**
     * The first name of the account holder.
     */
    firstName: string;

    /**
     * The last name of the account holder.
     */
    lastName: string;

    /**
     * The email address associated with the account.
     */
    email: string;

    /**
     * The URL of the profile image.
     */
    imageUrl: string;

    /**
     * Whether the account is activated.
     */
    activated: boolean;

    /**
     * The language key for the account.
     */
    langKey: string;

    /**
     * The user who created the account.
     */
    createdBy: string;

    /**
     * The date the account was created.
     */
    createdDate: string;

    /**
     * The user who last modified the account.
     */
    lastModifiedBy: string;

    /**
     * The date the account was last modified.
     */
    lastModifiedDate: string;

    /**
     * The authorities assigned to the account.
     */
    authorities: string[];
}

/**
 * The payload for a GET request to activate an account.
 */
export interface APIGetActivateBody {
    /**
     * The activation key for the account.
     */
    key: string;
}

/**
 * The payload for a POST request to change the password.
 */
export interface APIPostChangePasswordBody {
    /**
     * The current password of the account.
     */
    currentPassword: string;

    /**
     * The new password to set for the account.
     */
    newPassword: string;
}

/**
 * The payload for a POST request to log in.
 */
export interface APIPostLoginBody {
    /**
     * The username of the account.
     */
    username: string;

    /**
     * The password of the account.
     */
    password: string;

    /**
     * Whether to remember the user for future sessions.
     */
    rememberMe: boolean;
}

/**
 * The response of a POST request to log in.
 */
export interface APIPostLoginResult {
    /**
     * The JWT token for the session.
     */
    id_token: string;
}

/**
 * The payload for a POST request to register a new account.
 */
export interface APIPostRegisterBody {
    /**
     * The login name for the new account.
     */
    login: string;

    /**
     * The first name of the new account holder.
     */
    firstName: string;

    /**
     * The last name of the new account holder.
     */
    lastName: string;

    /**
     * The email address for the new account.
     */
    email: string;

    /**
     * The language key for the new account.
     */
    langKey: string;

    /**
     * The password for the new account.
     */
    password: string;
}

/**
 * The payload for a POST request to finish resetting a password.
 */
export interface APIPostResetPasswordFinishBody {
    /**
     * The reset key for the password reset process.
     */
    key: string;

    /**
     * The new password to set.
     */
    newPassword: string;
}
