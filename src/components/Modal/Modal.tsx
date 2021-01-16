import React, { memo } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close-icon.svg';
import { IconButton } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import './Modal.css';

interface ModalProps {
	isOpen: boolean;
	content: any;
	closeModal: Function;
	full: boolean;
}

/** Boilerplate template for any actions that require a Modal
 *
 * @param {boolean}		isOpen			Boolean if Modal is open or closed.
 * @param {element}		content			React component to display inside of Modal
 * @param {function}	closeModal		Function to close/toggle Modal component.
 * @param {boolean}		full			Boolean that toggles style of Modal display.
 */
function Modal({
	isOpen,
	content,
	closeModal,
	full = false,
}: ModalProps): JSX.Element {
	// Modal Height
	const styles = full ? 'Modal-Full-Content' : 'Modal-Content';

	// NOTE: To Avoid TypeScript error of '`onClick` cannot return `void`',
	// we have to wrap closeModal in a callback
	const closeModalDisplay = (): void => {
		closeModal();
	};

	return (
		<div className={`Modal ${isOpen ? 'fade-in' : 'fade-out'}`}>
			<div className="Modal-Close float-left">
				<IconButton onClick={closeModalDisplay}>
					<CloseIcon />
				</IconButton>
			</div>
			<div className={styles}>{content}</div>
		</div>
	);
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	content: PropTypes.element,
	closeModal: PropTypes.func,
	full: PropTypes.bool,
};

export default memo(Modal);
