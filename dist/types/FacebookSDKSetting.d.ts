export default interface FacebookSDKSetting {
    /**
     * The language code for the facebook sdk - the window will be displayed according to this language code.
     */
    language: string;
    /**
     * Determines which versions of the Graph API and any API dialogs or plugins are invoked when using the .api() and .ui() functions. Valid values are determined by currently available versions, such as 'v2.0'. This is a required parameter.
     */
    version: string;
    /**
     * Your application ID. If you don't have one find it in the App dashboard or go there to create a new app. Defaults to null.
     */
    appId: string;
    /**
     * Determines whether XFBML tags used by social plugins are parsed, and therefore whether the plugins are rendered or not.
     */
    xfbml: boolean;
    /**
     * Log app events .
     */
    autoLogAppEvents: boolean;
    /**
     * Determines whether a cookie is created for the session or not. If enabled, it can be accessed by server-side code. Defaults to false.
     */
    cookie: boolean;
}
//# sourceMappingURL=FacebookSDKSetting.d.ts.map