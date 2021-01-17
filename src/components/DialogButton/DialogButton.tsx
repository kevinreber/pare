/** Dependencies */
import React, { MouseEvent, memo } from 'react';

/** Components & Helpers */
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
	{
		label: {
			textTransform: 'none',
		},
		default: {
			border: '1px solid #fdce22',
			backgroundColor: '#292929',
			color: '#fdce22',
			margin: '0.5',
			padding: '0.5rem 2rem',
			borderRadius: '3px',
		},

		buttonStyle: (props: { type: string }) => {
			return {
				border:
					props.type === 'success' ? '1px solid #fdce22' : '1px solid #e15554',
				backgroundColor: props.type === 'success' ? '#fdce22' : '#e15554',
				color: '#292929',
				textTransform: 'none',
				margin: '0.5',
				padding: '0.5rem 2rem',
				borderRadius: '3px',
			};
		},
	}
	// )
);

interface Props {
	text: string;
	size: 'small' | 'medium' | 'large' | undefined;
	color: string;
	variant: 'text' | 'contained' | 'outlined' | undefined;
	onClick: MouseEvent<Element, MouseEvent>;
	type: string;
}

/** Button for Dialog Box */
const DialogButton = ({
	text,
	size = 'large',
	color,
	variant = 'contained',
	onClick,
	type = 'default',
}: Props): JSX.Element => {
	// NOTE: Need to pass in props as an object to bypass TS and MUI rules
	const props = { type };
	const classes = useStyles(props);

	const buttonType =
		type === 'default' ? classes?.default : classes?.buttonStyle;
	return (
		// @ts-ignore
		<MuiButton
			variant={variant}
			size={size}
			onClick={onClick}
			class={buttonType}>
			{text}
		</MuiButton>
	);
};

export default memo(DialogButton);
