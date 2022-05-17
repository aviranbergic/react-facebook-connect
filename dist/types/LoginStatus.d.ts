declare enum LoginStatus {
    /**
     *The person is logged into Facebook, and has logged into your webpage.
     */
    Connected = "connected",
    /**
     The person is logged into Facebook, but has not logged into your webpage.
    */
    NotAuthorized = "not_authorized",
    /**
      The person is not logged into Facebook, so you don't know if they have logged into your webpage.
      Or FB.logout() was called before, and therefore, it cannot connect to Facebook.
    */
    Unknown = "unknown"
}
export default LoginStatus;
//# sourceMappingURL=LoginStatus.d.ts.map