import AuthResponse from './AuthResponse';

export default interface FacebokLoginResponse {
  status: string;
  authResponse: AuthResponse;
}
