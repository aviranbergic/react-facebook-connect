import React from 'react';
import { FaFacebook } from 'react-icons/fa';
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
    var getIconStyle = function (customStyle, size) {
        if (customStyle) {
            return undefined;
        }
        return {
            fontSize: ICON_FONT_SIZE[size],
            marginRight: '6px'
        };
    };
    return (React.createElement("button", { onClick: onClick, onFocus: onFocus, onBlur: onBlur, disabled: isDisabled, style: getStyle(customStyle, size, variant, isDisabled) },
        React.createElement(FaFacebook, { style: getIconStyle(customStyle, size) }),
        React.createElement("span", null, children)));
};
export default FacebookLoginButton;
//# sourceMappingURL=FacebookLoginButton.js.map