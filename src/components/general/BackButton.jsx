import React from 'react';
import { ReactComponent as BackspaceIcon } from './icons/backspace-icon.svg';
import { useHistory } from 'react-router-dom';
import './styles/BackButton.css';

/** Back Button */
function BackButton({ url }) {
	const history = useHistory();
	const goBack = () => history.push(url);

	return (
		<div className='BackButton'>
			<BackspaceIcon onClick={goBack} />
		</div>
	);
}

export default BackButton;
