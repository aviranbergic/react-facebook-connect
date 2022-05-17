import React, { CSSProperties, FocusEventHandler, MouseEventHandler } from 'react';
interface FacebookLoginButtonProps {
    size: 'small' | 'medium' | 'large';
    onClick: MouseEventHandler<HTMLButtonElement>;
    onFocus: FocusEventHandler<HTMLButtonElement>;
    onBlur: FocusEventHandler<HTMLButtonElement>;
    isDisabled: boolean;
    variant: 'primary' | 'secondary';
    children?: React.ReactNode;
    customStyle?: CSSProperties | undefined;
}
declare const FacebookLoginButton: React.FC<FacebookLoginButtonProps>;
export default FacebookLoginButton;
//# sourceMappingURL=FacebookLoginButton.d.ts.map