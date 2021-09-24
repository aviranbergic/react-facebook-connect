import React, { FunctionComponent } from 'react';

export interface FacebookButtonProps {
  buttonText?: string;
  size?: string;
  cssClass?: string;
  icon?: any;
  buttonStyle?: object;
	onClick?: (e? : any) => { },
	onFocus?: (e? : any) => { },
  onBlur?: (e? : any) => { },
	isDisabled?: boolean,
	ariaLabel?: string,
}

const calculateResponsivenesss = (
	value1: number, width1: number, value2: number, width2: number) => {
  const a = (value2 - value1) / (width2 - width1);
  const b = (width2 * value1 - width1 * value2) / (width2 - width1);
  return `calc(${a}*100vw + ${b}*1px)`;
}

const getFacebookButtonStyle = (isDisabled: boolean) => {
	return {
		fontWeight: 'bold',
		borderWidth: calculateResponsivenesss(1, 468, 2, 1920),
		borderStyle: 'solid',
  	color: '#FFF',
  	cursor: isDisabled ? 'default' : 'pointer',
		display: 'inline-block',
  	fontSize: calculateResponsivenesss(14, 468, 18, 1920),
  	textDecoration: 'none',
  	textTransform: 'uppercase',
		transition: 'background-color .3s, border-color .3s',
		backgroundColor: '#4C69BA',
		borderColor: '#4C69BA',
		padding: `${calculateResponsivenesss(15, 468, 20, 1920)} ${calculateResponsivenesss(20, 468, 25, 1920)}`,
		opacity: isDisabled ? '0.38' : '1',
		iconCssClass: {
			marginLeft: '5px'
		},
	}
};

export const FacebookButton: FunctionComponent<FacebookButtonProps> = ({
    buttonText = 'Continue With Facebbok',
		isDisabled = false,
		buttonStyle = getFacebookButtonStyle(isDisabled),
		cssClass,
		onClick = () => {},
		onBlur = () => {},
		onFocus = () => {},
		icon = undefined,
		ariaLabel = 'facebook connect button',
}) => {

  return (
		<button
			style={buttonStyle}
			className={cssClass}
			onClick={onClick}
			disabled={isDisabled}
			onBlur={onBlur}
			onFocus={onFocus}
			aria-label={ariaLabel}
		>
			{icon && icon}
      {buttonText}
    </button>
  )
};