import React, { memo } from 'react';

interface Props {
	color: string;
}

/** Will display the current status of an assignment */
const AssignmentStatusIcon = ({ color = 'danger' }: Props): JSX.Element => {
	return <i className={`fas fa-circle ${color} Assignment-Status`}></i>;
};

export default memo(AssignmentStatusIcon);
