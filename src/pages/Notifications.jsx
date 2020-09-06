/** Dependencies */
import React, { useState } from 'react';

/** Components & Helpers */
import NotificationsList from '../components/Notifications/NotificationsList';
import MessagesList from '../components/Notifications/MessagesList';

/** User can see notifications and messages */
function Notifications() {
	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('notifications');
	const toggleActive = (e) => {
		setActive(e.target.id);
	};

	const PageBody =
		active === 'notifications' ? <NotificationsList /> : <MessagesList />;

	return (
		<>
			<div className='Notifications-Header Body-Header'>
				<div className='Notifications'>
					<h5
						id='notifications'
						className={
							active === 'notifications'
								? 'mate-text-primary'
								: 'mate-text-active'
						}
						onClick={toggleActive}>
						Notifications
					</h5>
				</div>
				<div className='Messages'>
					<h5
						id='messages'
						className={
							active === 'messages' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleActive}>
						Messages
					</h5>
				</div>
			</div>
			{PageBody}
		</>
	);
}

export default Notifications;
