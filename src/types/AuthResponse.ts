export default interface AuthResponse {
  accessToken: string;
  expiresIn: Date;
  // eslint-disable-next-line camelcase
  reauthorize_required_in: number;
  signedRequest: string;
  userID: string;
}
