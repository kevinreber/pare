import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(12),
	},
}));

/** Notification that pops up after every user CRUD action */
function Notification({ notify, setNotify }) {
	const classes = useStyles();

	const handleClose = (e, reason) => {
		setNotify({ ...notify, isOpen: false });
	};

	return (
		<Snackbar
			className={classes.root}
			open={notify.isOpen}
			autoHideDuration={3000}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			onClose={handleClose}>
			<Alert severity={notify.type} onClose={handleClose}>
				{notify.message}
			</Alert>
		</Snackbar>
	);
}

export default Notification;
