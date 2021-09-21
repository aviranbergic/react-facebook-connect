import { useEffect, useState } from 'react';
import { ScriptFetchStatus } from 'types';

const DATA_STATUS = 'data-status';

export default function useScript(
  src: string,
  isAsync: boolean,
  isAppendToHead: boolean
) {
  const [status, setStatus] = useState(
    src ? ScriptFetchStatus.Loading : ScriptFetchStatus.Error
  );
  useEffect(() => {
    if (!src) {
      setStatus(ScriptFetchStatus.Idel);
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`) as any;
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = isAsync;
      script.setAttribute(DATA_STATUS, ScriptFetchStatus.Loading);

      if (isAppendToHead) {
        document.head.appendChild(script);
      } else {
        document.body.appendChild(script);
      }

      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute(
          DATA_STATUS,
          event.type === 'load'
            ? ScriptFetchStatus.Ready
            : ScriptFetchStatus.Error
        );
      };
      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute(DATA_STATUS));
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(
        event.type === 'load'
          ? ScriptFetchStatus.Ready
          : ScriptFetchStatus.Error
      );
    };
    // Add event listeners
    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);
    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [src, isAppendToHead, isAsync]);

  return status;
}
