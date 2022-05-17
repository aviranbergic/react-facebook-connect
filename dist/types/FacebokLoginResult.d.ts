import { LoginStatus, AuthResponse, FacebookUserInfo } from 'types';
export default interface FacebokLoginResult {
    /**
     * The Facebook User Information.
     */
    facebookUserInfo: FacebookUserInfo;
    /**
     * The Login Status.
     */
    status: LoginStatus;
    /**
     * If the status is connected, the following authResponse parameters are included in the response.
     */
    authResponse: AuthResponse;
}
//# sourceMappingURL=FacebokLoginResult.d.ts.map