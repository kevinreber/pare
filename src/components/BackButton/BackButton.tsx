import React, { memo } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './BackButton.css';

/** Back Button */
const BackButton = (): JSX.Element => {
	const history = useHistory();

	const goBack = (): void => {
		history.goBack();
	};

	return (
		<div className="BackButton">
			<IconButton onClick={goBack}>
				<ArrowBackIosIcon />
			</IconButton>
		</div>
	);
};

export default memo(BackButton);
