export default interface AuthResponse {
    /**
     * An access token for the person using the webpage.
     */
    accessToken: string;
    /**
     * A UNIX time stamp when the token expires. Once the token expires, the person will need to login again.
     */
    expiresIn: Date;
    /**
     * The amount of time before the login expires, in seconds, and the person will need to login again.
     */
    reauthorize_required_in: number;
    /**
     * A signed parameter that contains information about the person using your webpage.
     */
    signedRequest: string;
    /**
     * The ID of the person using your webpage.
     */
    userID: string;
}
//# sourceMappingURL=AuthResponse.d.ts.map