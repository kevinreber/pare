/** Dependencies */
import React, { memo } from 'react';
import * as PropTypes from 'prop-types';

/** Components & Helpers */
import DialogButton from '../DialogButton/DialogButton';
import './ConfirmDialog.css';

/** MUI */
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	makeStyles,
	IconButton,
} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

const useStyles = makeStyles((theme) => ({
	dialog: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(5),
		backgroundColor: '#222831',
	},
	dialogTitle: {
		textAlign: 'center',
	},
	dialogContent: {
		textAlign: 'center',
	},
	dialogAction: {
		justifyContent: 'center',
	},
	titleIcon: {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
			cursor: 'default',
		},
		'& .MuiSvgIcon-root': {
			fontSize: '8rem',
		},
	},
	primaryDialogBtn: {
		backgroundColor: '#222831',
	},
}));

interface ConfirmProps {
	title: string;
	subtitle?: string;
	isOpen: boolean;
	onConfirm: Function;
}

interface Props {
	color?: string;
	confirmDialog: ConfirmProps;
	setConfirmDialog: Function;
	type?: string;
}

/** Confirmation Dialog to verify user wants to perform action.
 *
 * @param {object}		confirmDialog		Object of strings to display in dialog.
 * @param {function}	setConfirmDialog	Action to happen if User confirms dialog prompt.
 * @param {string}		type				Style type of confirmation dialog to display.
 */
function ConfirmDialog({
	color,
	confirmDialog,
	setConfirmDialog,
	type = 'success',
}: Props): JSX.Element {
	const classes = useStyles();
	return (
		<Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
			<DialogTitle
				className={`${classes.dialogTitle} ${
					type === 'success' ? 'Dialog-Success' : 'Dialog-Error'
				}`}>
				<IconButton disableRipple className={classes.titleIcon}>
					<NotListedLocationIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Typography variant="h6">{confirmDialog.title}</Typography>
			</DialogContent>
			<DialogContent>
				<Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
			</DialogContent>
			<DialogActions className={classes.dialogAction}>
				<DialogButton
					className={classes.primaryDialogBtn}
					text="No"
					// @ts-ignore
					onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
					type="default"
				/>
				<DialogButton
					className={`${classes.primaryDialogBtn} ${
						type === 'success' ? 'Dialog-Success' : 'Dialog-Error'
					}`}
					text="Yes"
					// @ts-ignore
					onClick={confirmDialog.onConfirm}
					type={type}
				/>
			</DialogActions>
		</Dialog>
	);
}

ConfirmDialog.propTypes = {
	confirmDialog: PropTypes.object,
	setConfirmDialog: PropTypes.func,
	type: PropTypes.string,
};

export default memo(ConfirmDialog);
