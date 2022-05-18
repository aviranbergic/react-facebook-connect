import React, { CSSProperties, FC, FocusEventHandler, useEffect } from 'react';
import mobile from 'is-mobile';

import { useFacebookSDK } from 'hooks';
import { FacebokLoginResponse, FacebokLoginResult, FacebookUserInfo, LoginStatus } from 'types';
import { FacebookLoginButton } from './';

export interface FacebookConnectProps {
  isDisabled: boolean;
  callback: (data?: any) => {};
  appId: string;
  xfbml: boolean;
  cookie: boolean;
  authType: string;
  scope: string;
  state: string;
  responseType: string;
  returnScopes: boolean;
  redirectUri: string;
  allowMobileRedirect: boolean;
  fields: string;
  version: string;
  language: string;
  onFailure: (error?: string) => {};
  isAsync: boolean;
  isAppendToHead: boolean;
  autoLogAppEvents: boolean;
  buttonSize: 'small' | 'medium' | 'large';
  onFocus: FocusEventHandler<HTMLButtonElement>;
  onBlur: FocusEventHandler<HTMLButtonElement>;
  variant: 'primary' | 'secondary';
  customStyle?: CSSProperties | undefined
  Icon?: JSX.Element;
  ariaLabel?: string;
  buttonText: string;
  children: React.ReactNode;
}

export const FacebookConnect: FC<FacebookConnectProps> = ({
  callback,
  onFocus,
  onBlur,
  onFailure,
  appId,
  xfbml = true,
  cookie,
  authType,
  scope = 'public_profile',
  state,
  responseType = 'code',
  returnScopes,
  redirectUri = typeof window !== 'undefined' ? window.location.href : '/',
  allowMobileRedirect,
  fields = 'name',
  version = '13.0',
  language = 'en_US',
  autoLogAppEvents = true,
  buttonSize = 'large',
  isDisabled,
  variant = 'primary',
  customStyle,
  Icon,
  ariaLabel,
  buttonText,
  children
}: FacebookConnectProps) => {

  const { isReady, isError } = useFacebookSDK({ language, version, appId, xfbml, autoLogAppEvents, cookie });

  const onFacebookStatusCheckResponse = (facebokLoginResponse: FacebokLoginResponse) => {
    if (!facebokLoginResponse?.authResponse) {
      handleError(facebokLoginResponse?.status as LoginStatus)
    }
    if (facebokLoginResponse?.status == LoginStatus.Connected) {
      validateLoginStatus(facebokLoginResponse);
    }
  }

  const validateLoginStatus = (facebokLoginResponse: FacebokLoginResponse) => {
    window.FB.api('/me', { locale: language, fields }, (userInfo: FacebookUserInfo) => {
      const { authResponse, status } = facebokLoginResponse;
      const loginResult: FacebokLoginResult = { authResponse, status, facebookUserInfo: userInfo }
      callback(loginResult);
    });
  }

  const handleError = (error: string, loginStatus?: LoginStatus) => {
    const result: string = loginStatus ?? error;
    if (onFailure) {
      onFailure(result);
    } else {
      callback(result);
    }
  }

  const buildQueryString = (loginParams: Record<string, any>) => {
    return Object.keys(loginParams).map(key => `${key}=${encodeURIComponent(loginParams[key])}`).join('&');
  }

  const facebookLoginClickHandler = () => {
    const loginParams: Record<string, any> = {
      client_id: appId,
      redirect_uri: redirectUri,
      state,
      return_scopes: returnScopes,
      scope,
      response_type: responseType,
      auth_type: authType,
    };
    
    if (mobile() && allowMobileRedirect) {
      window.location.href = `https://www.facebook.com/dialog/oauth?${buildQueryString(loginParams)}`
    } else {
      if (!isReady) {
        handleError('FacebookSdkNotLoaded')
        return;
      }

      window.FB.getLoginStatus((facebokLoginResponse: FacebokLoginResponse) => {
        if (facebokLoginResponse.status == LoginStatus.Connected) {
          validateLoginStatus(facebokLoginResponse);
        } else {
          window.FB.login(onFacebookStatusCheckResponse, { scope, return_scopes: returnScopes, auth_type: loginParams.auth_type });
        }
      });
    }
  }

  useEffect(() => {
    if (isReady) {
      window.FB.getLoginStatus((response: FacebokLoginResponse) => {
        onFacebookStatusCheckResponse(response);
      });
    }

    if (isError) {
      handleError('FacebookSdkNotLoaded')
    }

  }, [isReady, isError])

  return (
    <FacebookLoginButton
      size={buttonSize}
      variant={variant}
      onClick={facebookLoginClickHandler}
      onFocus={onFocus}
      onBlur={onBlur}
      isDisabled={isDisabled}
      Icon={Icon}
      customStyle={customStyle}
      ariaLabel={ariaLabel}
      buttonText={buttonText}>
      {children}
    </FacebookLoginButton>
  )
};

export default FacebookConnect;