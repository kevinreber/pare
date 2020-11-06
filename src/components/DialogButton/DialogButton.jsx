/** Dependencies */
import React from 'react';

/** Components & Helpers */
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(0.5),
	},
	label: {
		textTransform: 'none',
	},
}));

/** Button for Dialog Box */
function DialogButton(props) {
	const { text, size, color, variant, onClick, ...other } = props;
	const classes = useStyles();

	return (
		<MuiButton
			variant={variant || 'contained'}
			size={size || 'large'}
			onClick={onClick}
			{...other}
			classes={{ root: classes.root, label: classes.label }}>
			{text}
		</MuiButton>
	);
}

export default DialogButton;
