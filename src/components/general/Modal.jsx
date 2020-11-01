import React from 'react';
import { ReactComponent as CloseIcon } from './icons/close-icon.svg';
import { IconButton } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import './styles/Modal.css';

/** Boilerplate template for any actions that require a Modal
 *
 * @param {element}		content			React component to display inside of Modal
 * @param {function}	closeModal		Function to close/toggle Modal component.
 * @param {boolean}		full			Boolean that toggles style of Modal display.
 */
function Modal({ content, closeModal, full = false }) {
	// Modal Height
	const styles = full ? 'Modal-Full-Content' : 'Modal-Content';
	return (
		<div className="Modal">
			<div className="Modal-Close float-left">
				<IconButton onClick={closeModal}>
					<CloseIcon />
				</IconButton>
			</div>
			<div className={styles}>{content}</div>
		</div>
	);
}

Modal.propTypes = {
	content: PropTypes.element,
	closeModal: PropTypes.func,
	full: PropTypes.bool,
};

export default Modal;
