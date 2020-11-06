/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

/** Material UI */
import { IconButton, Badge } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

function NotificationIcon() {
	return (
		<IconButton>
			<Link to="/notifications">
				{/* <NotifyIcon /> */}
				<Badge badgeContent={4}>
					<NotificationsNoneOutlinedIcon style={{ fontSize: 45 }} />
				</Badge>
			</Link>
		</IconButton>
	);
}

export default NotificationIcon;
