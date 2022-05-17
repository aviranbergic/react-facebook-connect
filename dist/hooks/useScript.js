import { useEffect, useState } from 'react';
import { ScriptFetchStatus } from 'types';
var DATA_STATUS = 'data-status';
/**
 * useScript - Custom hook used to fetch and inject a script.
 */
export default function useScript(src, id, isAsync, isAppendToHead) {
    if (isAsync === void 0) { isAsync = true; }
    if (isAppendToHead === void 0) { isAppendToHead = true; }
    var _a = useState(src ? ScriptFetchStatus.Loading : ScriptFetchStatus.Error), status = _a[0], setStatus = _a[1];
    useEffect(function () {
        if (!src) {
            setStatus(ScriptFetchStatus.Idel);
            return;
        }
        var script = document.querySelector("script[src=\"" + src + "\"]");
        if (!script) {
            script = document.createElement('script');
            script.src = src;
            if (isAsync) {
                script.async = isAsync;
            }
            script.setAttribute(DATA_STATUS, ScriptFetchStatus.Loading);
            script.id = id;
            if (isAppendToHead) {
                document.head.appendChild(script);
            }
            else {
                document.body.appendChild(script);
            }
            var setAttributeFromEvent = function (event) {
                script.setAttribute(DATA_STATUS, event.type === 'load'
                    ? ScriptFetchStatus.Ready
                    : ScriptFetchStatus.Error);
            };
            script.addEventListener('load', setAttributeFromEvent);
            script.addEventListener('error', setAttributeFromEvent);
        }
        else {
            setStatus(script.getAttribute(DATA_STATUS));
        }
        var setStateFromEvent = function (event) {
            setStatus(event.type === 'load'
                ? ScriptFetchStatus.Ready
                : ScriptFetchStatus.Error);
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
//# sourceMappingURL=useScript.js.map