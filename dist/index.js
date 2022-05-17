'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var isMobile_1 = isMobile;
var isMobile_2 = isMobile;
var default_1 = isMobile;

const mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
const notMobileRE = /CrOS/;

const tabletRE = /android|ipad|playbook|silk/i;

function isMobile (opts) {
  if (!opts) opts = {};
  let ua = opts.ua;
  if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua !== 'string') return false

  let result =
    (mobileRE.test(ua) && !notMobileRE.test(ua)) ||
    (!!opts.tablet && tabletRE.test(ua));

  if (
    !result &&
    opts.tablet &&
    opts.featureDetect &&
    navigator &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  ) {
    result = true;
  }

  return result
}
isMobile_1.isMobile = isMobile_2;
isMobile_1.default = default_1;

var LoginStatus;
(function (LoginStatus) {
    /**
     *The person is logged into Facebook, and has logged into your webpage.
     */
    LoginStatus["Connected"] = "connected";
    /**
     The person is logged into Facebook, but has not logged into your webpage.
    */
    LoginStatus["NotAuthorized"] = "not_authorized";
    /**
      The person is not logged into Facebook, so you don't know if they have logged into your webpage.
      Or FB.logout() was called before, and therefore, it cannot connect to Facebook.
    */
    LoginStatus["Unknown"] = "unknown";
})(LoginStatus || (LoginStatus = {}));
var LoginStatus$1 = LoginStatus;

var ScriptFetchStatus;
(function (ScriptFetchStatus) {
    ScriptFetchStatus["Loading"] = "loading";
    ScriptFetchStatus["Idel"] = "idle";
    ScriptFetchStatus["Ready"] = "ready";
    ScriptFetchStatus["Error"] = "error";
})(ScriptFetchStatus || (ScriptFetchStatus = {}));
var ScriptFetchStatus$1 = ScriptFetchStatus;

var DATA_STATUS = 'data-status';
/**
 * useScript - Custom hook used to fetch and inject a script.
 */
function useScript(src, id, isAsync, isAppendToHead) {
    if (isAsync === void 0) { isAsync = true; }
    if (isAppendToHead === void 0) { isAppendToHead = true; }
    var _a = React.useState(src ? ScriptFetchStatus$1.Loading : ScriptFetchStatus$1.Error), status = _a[0], setStatus = _a[1];
    React.useEffect(function () {
        if (!src) {
            setStatus(ScriptFetchStatus$1.Idel);
            return;
        }
        var script = document.querySelector("script[src=\"" + src + "\"]");
        if (!script) {
            script = document.createElement('script');
            script.src = src;
            if (isAsync) {
                script.async = isAsync;
            }
            script.setAttribute(DATA_STATUS, ScriptFetchStatus$1.Loading);
            script.id = id;
            if (isAppendToHead) {
                document.head.appendChild(script);
            }
            else {
                document.body.appendChild(script);
            }
            var setAttributeFromEvent = function (event) {
                script.setAttribute(DATA_STATUS, event.type === 'load'
                    ? ScriptFetchStatus$1.Ready
                    : ScriptFetchStatus$1.Error);
            };
            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);
        }
        else {
            setStatus(script.getAttribute(DATA_STATUS));
        }
        var setStateFromEvent = function (event) {
            setStatus(event.type === 'load'
                ? ScriptFetchStatus$1.Ready
                : ScriptFetchStatus$1.Error);
        };
        // Add event listeners
        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);
        // Remove event listeners on cleanup
        return function () {
            if (script) {
                script.removeEventListener('load', setStateFromEvent);
                script.removeEventListener('error', setStateFromEvent);
            }
        };
    }, [src, id, isAsync, isAppendToHead]);
    return status;
}

/**
 * useFacebookSDK - Custom hook used to load -> inject -> initilize the facebook SDK.
 */
function useFacebookSDK(_a) {
    var language = _a.language, version = _a.version, appId = _a.appId, xfbml = _a.xfbml, autoLogAppEvents = _a.autoLogAppEvents, cookie = _a.cookie;
    var _b = React.useState(false), isReady = _b[0], setIsReady = _b[1];
    var _c = React.useState(false), isError = _c[0], setIsError = _c[1];
    React.useEffect(function () {
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
    if (sdkFetchStatus === ScriptFetchStatus$1.Error) {
        setIsError(true);
    }
    return { isReady: isReady, isError: isError };
}

var FacebookConnect = function (_a) {
    var callback = _a.callback, onFocus = _a.onFocus, onBlur = _a.onBlur, onFailure = _a.onFailure, appId = _a.appId, _b = _a.xfbml, xfbml = _b === void 0 ? true : _b, cookie = _a.cookie, authType = _a.authType, _c = _a.scope, scope = _c === void 0 ? 'public_profile' : _c, state = _a.state, _d = _a.responseType, responseType = _d === void 0 ? 'code' : _d, returnScopes = _a.returnScopes, _e = _a.redirectUri, redirectUri = _e === void 0 ? typeof window !== 'undefined' ? window.location.href : '/' : _e, disableMobileRedirect = _a.disableMobileRedirect, _f = _a.fields, fields = _f === void 0 ? 'name' : _f, _g = _a.version, version = _g === void 0 ? '13.0' : _g, _h = _a.language, language = _h === void 0 ? 'en_US' : _h, _j = _a.autoLogAppEvents, autoLogAppEvents = _j === void 0 ? true : _j, _k = _a.buttonSize, buttonSize = _k === void 0 ? 'large' : _k, isDisabled = _a.isDisabled, _l = _a.variant, variant = _l === void 0 ? 'primary' : _l, customStyle = _a.customStyle, children = _a.children;
    var _m = useFacebookSDK({ language: language, version: version, appId: appId, xfbml: xfbml, autoLogAppEvents: autoLogAppEvents, cookie: cookie }), isReady = _m.isReady, isError = _m.isError;
    var onFacebookStatusCheckResponse = function (facebokLoginResponse) {
        if (!(facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.authResponse)) {
            handleError(facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.status);
        }
        if ((facebokLoginResponse === null || facebokLoginResponse === void 0 ? void 0 : facebokLoginResponse.status) == LoginStatus$1.Connected) {
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
        if (isMobile_1() && !disableMobileRedirect) {
            window.location.href = "https://www.facebook.com/dialog/oauth" + new URLSearchParams(loginParams).toString();
        }
        else {
            if (!isReady) {
                handleError('FacebookSdkNotLoaded');
                return;
            }
            window.FB.getLoginStatus(function (facebokLoginResponse) {
                if (facebokLoginResponse.status == LoginStatus$1.Connected) {
                    validateLoginStatus(facebokLoginResponse);
                }
                else {
                    window.FB.login(onFacebookStatusCheckResponse, { scope: scope, return_scopes: returnScopes, auth_type: loginParams.auth_type });
                }
            });
        }
    };
    React.useEffect(function () {
        if (isReady) {
            window.FB.getLoginStatus(function (response) {
                onFacebookStatusCheckResponse(response);
            });
        }
        if (isError) {
            handleError('FacebookSdkNotLoaded');
        }
    }, [isReady, isError]);
    return (React__default['default'].createElement(FacebookLoginButton, { size: buttonSize, variant: variant, onClick: facebookLoginClickHandler, onFocus: onFocus, onBlur: onBlur, isDisabled: isDisabled, customStyle: customStyle }, children));
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React__default['default'].createContext && React__default['default'].createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React__default['default'].createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}

function GenIcon(data) {
  return function (props) {
    return React__default['default'].createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);

    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + ' ' : '') + props.className;
    return React__default['default'].createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React__default['default'].createElement("title", null, title), props.children);
  };

  return IconContext !== undefined ? React__default['default'].createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaFacebook (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"}}]})(props);
}

var BUTTON_HEIGHT = {
    small: '24px',
    medium: '32px',
    large: '40px',
};
var FONT_SIZE = {
    small: '12px',
    medium: '16px',
    large: '20px',
};
var ICON_FONT_SIZE = {
    small: '16px',
    medium: '20px',
    large: '24px',
};
var FacebookLoginButton = function (_a) {
    var size = _a.size, onClick = _a.onClick, onFocus = _a.onFocus, onBlur = _a.onBlur, isDisabled = _a.isDisabled, variant = _a.variant, children = _a.children, customStyle = _a.customStyle;
    var getStyle = function (customStyle, size, variant, isDisabled) {
        if (customStyle) {
            return customStyle;
        }
        return {
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            fontSize: FONT_SIZE[size],
            borderRadius: '4px',
            height: BUTTON_HEIGHT[size],
            cursor: 'pointer',
            opacity: isDisabled ? '0.38' : '1',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            backgroundColor: variant == 'primary' ? '#4267b2' : '#1877f2',
            borderColor: variant == 'primary' ? '#4267b2' : '#1877f2',
            color: '#fff',
            fontFamily: 'Helvetica, Arial, sans-serif',
        };
    };
    return (React__default['default'].createElement("button", { onClick: onClick, onFocus: onFocus, onBlur: onBlur, disabled: isDisabled, style: getStyle(customStyle, size, variant, isDisabled) },
        React__default['default'].createElement(FaFacebook, { style: {
                fontSize: ICON_FONT_SIZE[size],
                marginRight: '6px'
            } }),
        React__default['default'].createElement("span", null, children)));
};

exports.LoginStatus = LoginStatus$1;
exports.ScriptFetchStatus = ScriptFetchStatus$1;
exports['default'] = FacebookConnect;
//# sourceMappingURL=index.js.map
