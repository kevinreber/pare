/** Dependencies */
import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import { addFlashMessage } from '../../store/actions/flashMessages';
import './Notification.css';

/** MUI */
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	root: {
		top: theme.spacing(12),
	},
}));

/** Notification that pops up after every user CRUD action */
const Notification = (): JSX.Element => {
	const classes = useStyles();
	const dispatch = useDispatch();

	/** get status of flashMessages  in store*/
	// @ts-ignore
	let notify = useSelector((state) => state.flashMessages);

	/** Close Notification */
	const handleClose = (): void => {
		dispatch(
			addFlashMessage({
				isOpen: false,
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
};

export default memo(Notification);
