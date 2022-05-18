import React, { CSSProperties, FocusEventHandler, MouseEventHandler } from 'react';
import { FaFacebook } from 'react-icons/fa';

const BUTTON_HEIGHT = {
    small: '24px',
    medium: '32px',
    large: '40px',
}

const FONT_SIZE = {
    small: '12px',
    medium: '16px',
    large: '20px',
}

const ICON_FONT_SIZE = {
    small: '16px',
    medium: '20px',
    large: '24px',
}

interface FacebookLoginButtonProps {
    size: 'small' | 'medium' | 'large';
    onClick: MouseEventHandler<HTMLButtonElement>;
    onFocus: FocusEventHandler<HTMLButtonElement>,
    onBlur: FocusEventHandler<HTMLButtonElement>,
    isDisabled: boolean,
    variant: 'primary' | 'secondary';
    Icon?: JSX.Element;
    customStyle?: CSSProperties | undefined
    children?: React.ReactNode;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({
    size,
    onClick,
    onFocus,
    onBlur,
    isDisabled,
    variant,
    Icon,
    children,
    customStyle
}: FacebookLoginButtonProps) => {
    const getStyle = (customStyle: CSSProperties | undefined, size: 'small' | 'medium' | 'large', variant: 'primary' | 'secondary', isDisabled: boolean): CSSProperties => {
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
        }
    }

    const getIconStyle = (customStyle: CSSProperties | undefined, size: 'small' | 'medium' | 'large'): CSSProperties | undefined => {
        if (customStyle) {
            return undefined;
        }
        return {
            fontSize: ICON_FONT_SIZE[size],
            marginRight: '6px'
        };
    }


    return (
        <button
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={isDisabled}
            style={getStyle(customStyle, size, variant, isDisabled)}
        >
            {Icon ? Icon : <FaFacebook style={getIconStyle(customStyle, size)} />}
            <span>
                {children}
            </span>
        </button>
    );
}

export default FacebookLoginButton;