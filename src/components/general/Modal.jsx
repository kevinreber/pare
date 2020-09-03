import React from 'react';
import { ReactComponent as CloseIcon } from './icons/close-icon.svg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import './styles/Modal.css';

/** Boilerplate template for any actions that require a Modal */
function Modal({ content, closeModal, full = false }) {
	// Modal Height
	const styles = full ? 'Modal-Full-Content' : 'Modal-Content';
	return (
		<div className='Modal'>
			<div className='Modal-Close float-left'>
				{/* <h4 onClick={closeModal}> */}
				<IconButton onClick={closeModal}>
					<CloseIcon />
				</IconButton>
				{/* <CloseIcon /> */}
				{/* </h4> */}
			</div>
			<div className={styles}>{content}</div>
		</div>
	);
}

export default Modal;
