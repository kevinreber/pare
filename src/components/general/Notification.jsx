/** Dependencies */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import { addFlashMessage } from '../../store/actions/flashMessages';
import './styles/Notification.css';

/** MUI */
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(12),
	},
}));

/** Notification that pops up after every user CRUD action */
function Notification() {
	const classes = useStyles();
	const dispatch = useDispatch();

	/** get status of flashMessages  in store*/
	let notify = useSelector((state) => state.flashMessages);
	console.log(notify);

	/** Close Notification */
	const handleClose = (e, reason) => {
		dispatch(
			addFlashMessage({
				isOpen: !notify.isOpen,
			})
		);
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
