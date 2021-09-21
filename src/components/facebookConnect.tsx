import useScript from 'hooks/useScript';
import React, { FunctionComponent, useEffect } from 'react';
import { ScriptFetchStatus } from 'types';

export interface FacebookConnectProps {
  isDisabled: boolean;
  callback: any;
  appId: string;
  xfbml: boolean;
  cookie: boolean;
  authType: string;
  scope: string;
  state: string;
  responseType: string;
  returnScopes: boolean;
  redirectUri: string;
  autoLoad: boolean;
  disableMobileRedirect: boolean;
  isMobile: boolean;
  fields: string;
  version: string;
  language: string;
  onClick: any;
  onFailure: any;
  isAsync: boolean;
  isAppendToHead: boolean;
  autoLogAppEvents: boolean;
  callbackAfterSdkLoaded: any;
}

export const FacebookConnect: FunctionComponent<FacebookConnectProps> = ({
  language,
  isAsync,
  isAppendToHead,
  version,
  appId,
  xfbml,
  autoLogAppEvents,
  ...props
}) => {
  useEffect(() => {
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        autoLogAppEvents,
      });
    };
  }, [version, appId, xfbml, autoLogAppEvents]);

  const sdkFetchStatus = useScript(
    `https://connect.facebook.net/${language}/sdk.js`,
    isAsync,
    isAppendToHead
  );

  if (sdkFetchStatus === ScriptFetchStatus.Error) {
    return <h2>{props.isDisabled}</h2>;
  }
  return <h2>{props.isDisabled}</h2>;
};
