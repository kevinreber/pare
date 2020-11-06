import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './BackButton.css';

/** Back Button */
function BackButton() {
	const history = useHistory();
	const goBack = () => {
		history.goBack();
	};

	return (
		<div className="BackButton">
			<IconButton onClick={goBack}>
				<ArrowBackIosIcon />
			</IconButton>
		</div>
	);
}

export default BackButton;
