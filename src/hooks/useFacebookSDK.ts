import { useEffect, useState } from 'react';
import { FacebookSDKSetting, ScriptFetchStatus } from 'types';
import useScript from './useScript';

/**
 * useFacebookSDK - Custom hook used to load -> inject -> initilize the facebook SDK.
 */
export default function useFacebookSDK({
  language,
  version,
  appId,
  xfbml,
  autoLogAppEvents,
  cookie,
}: FacebookSDKSetting) {
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (document.getElementById('facebook-sdk')) {
      setIsReady(true);
      return;
    }

    if (!isReady) {
      window.fbAsyncInit = () => {
        window.FB.init({
          version: `v${version}`,
          appId,
          xfbml,
          autoLogAppEvents,
          cookie,
        });
        setIsReady(true);
      };

      let fbRoot = document.getElementById('fb-root');
      if (!fbRoot) {
        fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';
        document.body.appendChild(fbRoot);
      }
    }
  }, [isReady, language, version, appId, xfbml, autoLogAppEvents, cookie]);

  const sdkFetchStatus: ScriptFetchStatus = useScript(
    `https://connect.facebook.net/${language}/sdk.js`,
    'facebook-sdk'
  );

  if (sdkFetchStatus === ScriptFetchStatus.Error) {
    setIsError(true);
  }

  return { isReady, isError };
}
