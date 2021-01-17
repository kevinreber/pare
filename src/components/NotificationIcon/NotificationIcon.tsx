/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

/** Material UI */
import { IconButton } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const NotificationIcon = (): JSX.Element => {
	return (
		<IconButton>
			<Link to="/messages">
				<MailOutlineIcon style={{ fontSize: 45 }} />
			</Link>
		</IconButton>
	);
};

export default NotificationIcon;
