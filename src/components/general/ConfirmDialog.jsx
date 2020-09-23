/** Dependencies */
import React from 'react';

/** Components & Helpers */
import DialogButton from './DialogButton';
import './styles/ConfirmDialog.css';

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

/** Confirmation Dialog to verify user wants to perform action */
function ConfirmDialog({
	color,
	confirmDialog,
	setConfirmDialog,
	type = 'success',
}) {
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
					className={classes.primaryDialogButton}
					text="No"
					onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
				/>
				<DialogButton
					className={`${classes.primaryDialogButton} ${
						type === 'success' ? 'Dialog-Success' : 'Dialog-Error'
					}`}
					text="Yes"
					onClick={confirmDialog.onConfirm}
				/>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
