import { useEffect, useState } from 'react';
import { ScriptFetchStatus } from 'types';
import useScript from './useScript';
/**
 * useFacebookSDK - Custom hook used to load -> inject -> initilize the facebook SDK.
 */
export default function useFacebookSDK(_a) {
    var language = _a.language, version = _a.version, appId = _a.appId, xfbml = _a.xfbml, autoLogAppEvents = _a.autoLogAppEvents, cookie = _a.cookie;
    var _b = useState(false), isReady = _b[0], setIsReady = _b[1];
    var _c = useState(false), isError = _c[0], setIsError = _c[1];
    useEffect(function () {
        if (document.getElementById('facebook-sdk')) {
            setIsReady(true);
            return;
        }
        if (!isReady) {
            window.fbAsyncInit = function () {
                window.FB.init({
                    version: "v" + version,
                    appId: appId,
                    xfbml: xfbml,
                    autoLogAppEvents: autoLogAppEvents,
                    cookie: cookie,
                });
                setIsReady(true);
            };
            var fbRoot = document.getElementById('fb-root');
            if (!fbRoot) {
                fbRoot = document.createElement('div');
                fbRoot.id = 'fb-root';
                document.body.appendChild(fbRoot);
            }
        }
    }, [isReady, language, version, appId, xfbml, autoLogAppEvents, cookie]);
    var sdkFetchStatus = useScript("https://connect.facebook.net/" + language + "/sdk.js", 'facebook-sdk');
    if (sdkFetchStatus === ScriptFetchStatus.Error) {
        setIsError(true);
    }
    return { isReady: isReady, isError: isError };
}
//# sourceMappingURL=useFacebookSDK.js.map