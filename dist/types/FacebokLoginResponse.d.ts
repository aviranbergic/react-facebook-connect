import { AuthResponse, LoginStatus } from 'types';
export default interface FacebokLoginResponse {
    /**
     * The Facebook Login Status.
     */
    status: LoginStatus;
    /**
     * If the status is connected, the following authResponse parameters are included in the response.
     */
    authResponse: AuthResponse;
}
//# sourceMappingURL=FacebokLoginResponse.d.ts.map