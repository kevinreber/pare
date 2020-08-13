import React from 'react';

/** Will display the current status of an assignment */
function AssignmentStatusIcon({ color = 'danger' }) {
	return <i className={`fas fa-circle ${color} Assignment-Status`}></i>;
}

export default AssignmentStatusIcon;
