import React from 'react';
import { ReactComponent as BackspaceIcon } from './icons/backspace-icon.svg';
import { useHistory } from 'react-router-dom';
import './styles/BackButton.css';

/** Back Button */
function BackButton() {
	const history = useHistory();
	const goBack = () => history.goBack();

	return (
		<div className='BackButton'>
			<BackspaceIcon onClick={goBack} />
		</div>
	);
}

export default BackButton;
