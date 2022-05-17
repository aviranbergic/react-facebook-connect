import React, { useEffect } from 'react';
import mobile from 'is-mobile';
import { useFacebookSDK } from 'hooks';
import { LoginStatus } from 'types';
import { FacebookLoginButton } from './';
export var FacebookConnect = function (_a) {
    var callback = _a.callback, onFocus = _a.onFocus, onBlur = _a.onBlur, onFailure = _a.onFailure, appId = _a.appId, _b = _a.xfbml, xfbml = _b === void 0 ? true : _b, cookie = _a.cookie, authType = _a.authType, _c = _a.scope, scope = _c === void 0 ? 'public_profile' : _c, state = _a.state, _d = _a.responseType, responseType = _d === void 0 ? 'code' : _d, returnScopes = _a.returnScopes, _e = _a.redirectUri, redirectUri = _e === void 0 ? typeof window !== 'undefined' ? window.location.href : '/' : _e, disableMobileRedirect = _a.disableMobileRedirect, _f = _a.fields, fields = _f === void 0 ? 'name' : _f, _g = _a.version, version = _g === void 0 ? '13.0' : _g, _h = _a.language, language = _h === void 0 ? 'en_US' : _h, _j = _a.autoLogAppEvents, autoLogAppEvents = _j === void 0 ? true : _j, _k = _a.buttonSize, buttonSize = _k === void 0 ? 'large' : _k, isDisabled = _a.isDisabled, _l = _a.variant, variant = _l === void 0 ? 'primary' : _l, customStyle = _a.customStyle, children = _a.children;
    var _m = useFacebookSDK({ language: language, version: version, appId: appId, xfbml: xfbml, autoLogAppEvents: autoLogAppEvents, cookie: cookie }), isReady = _m.isReady, isError = _m.isError;
    var onFacebookStatusCheckResponse = function (facebokLoginResponse) {
        if (!(facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.authResponse)) {
            handleError(facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.status);
        }
        if ((facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.status) == LoginStatus.Connected) {
            validateLoginStatus(facebokLoginResponse);
        }
    };
    var validateLoginStatus = function (facebokLoginResponse) {
        window.FB.api('/me', { locale: language, fields: fields }, function (userInfo) {
            var authResponse = facebokLoginResponse.authResponse, status = facebokLoginResponse.status;
            var loginResult = { authResponse: authResponse, status: status, facebookUserInfo: userInfo };
            callback(loginResult);
        });
    };
    var handleError = function (error, loginStatus) {
        var result = loginStatus !== null && loginStatus !== void 0 ? loginStatus : error;
        if (onFailure) {
            onFailure(result);
        }
        else {
            callback(result);
        }
    };
    var facebookLoginClickHandler = function () {
        var loginParams = {
            client_id: appId,
            redirect_uri: redirectUri,
            state: state,
            return_scopes: returnScopes,
            scope: scope,
            response_type: responseType,
            auth_type: authType,
        };
        if (mobile() && !disableMobileRedirect) {
            window.location.href = "https://www.facebook.com/dialog/oauth" + new URLSearchParams(loginParams).toString();
        }
        else {
            if (!isReady) {
                handleError('FacebookSdkNotLoaded');
                return;
            }
            window.FB.getLoginStatus(function (facebokLoginResponse) {
                if (facebokLoginResponse.status == LoginStatus.Connected) {
                    validateLoginStatus(facebokLoginResponse);
                }
                else {
                    window.FB.login(onFacebookStatusCheckResponse, { scope: scope, return_scopes: returnScopes, auth_type: loginParams.auth_type });
                }
            });
        }
    };
    useEffect(function () {
        if (isReady) {
            window.FB.getLoginStatus(function (response) {
                onFacebookStatusCheckResponse(response);
            });
        }
        if (isError) {
            handleError('FacebookSdkNotLoaded');
        }
    }, [isReady, isError]);
    return (React.createElement(FacebookLoginButton, { size: buttonSize, variant: variant, onClick: facebookLoginClickHandler, onFocus: onFocus, onBlur: onBlur, isDisabled: isDisabled, customStyle: customStyle }, children));
};
export default FacebookConnect;
//# sourceMappingURL=FacebookConnect.js.map