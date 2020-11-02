/** Dependencies */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import { ReactComponent as CloseIcon } from './icons/close-icon.svg';
import { showModalContent } from '../../store/actions/modal';
import './styles/Modal.css';

/** MUI */
import { IconButton } from '@material-ui/core';

/** Boilerplate template for any actions that require a Modal.
 */
function SubModal() {
	const dispatch = useDispatch();

	const modal = useSelector((state) => state.modal);

	const handleClose = () => {
		dispatch(
			showModalContent({
				isOpen: !modal.isOpen,
			})
		);
	};

	// Modal Height
	const styles = modal.full ? 'Modal-Full-Content' : 'Modal-Content';

	return (
		<>
			{modal.isOpen ? (
				<div className="Modal">
					<div className="Modal-Close float-left">
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
					<div className={styles}>{modal.content}</div>
				</div>
			) : null}
		</>
	);
}

export default SubModal;
