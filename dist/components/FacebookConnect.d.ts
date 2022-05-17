import React, { CSSProperties, FC, FocusEventHandler } from 'react';
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
    disableMobileRedirect: boolean;
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
    customStyle?: CSSProperties | undefined;
    children: React.ReactNode;
}
export declare const FacebookConnect: FC<FacebookConnectProps>;
export default FacebookConnect;
//# sourceMappingURL=FacebookConnect.d.ts.map