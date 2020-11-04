/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import NotificationsList from './components/NotificationsList';
import MessagesList from './components/MessagesList';
import NewMessageForm from './components/NewMessageForm';
import Modal from '../../components/general/Modal';
import db from '../../config/fbConfig';
import './Notifications.css';

import { addFlashMessage } from '../../store/actions/flashMessages';
import createNewMessage from '../../utils/createNewMessage';

/** User can see notifications and messages */
function Notifications() {
	const history = useHistory();
	const currentUser = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('notifications');
	const toggleActive = (e) => {
		setActive(e.target.id);
	};

	/** New Message Form */
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		console.log('fetching...');
		db.collection('messages')
			.where('users', 'array-contains', currentUser.uid)
			// .orderBy('lastUpdatedAt')
			.get()
			.then((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => {
						return {
							id: doc.id,
							data: doc.data(),
						};
					})
				);
			});
	}, [currentUser]);

	const PageBody =
		active === 'notifications' ? (
			<NotificationsList />
		) : (
			<MessagesList
				messages={messages}
				userId={currentUser.uid}
				toggleForm={toggleForm}
			/>
		);

	const sendMessage = async (messageData, chatData) => {
		// store messageId given back
		const messageId = await createNewMessage(
			'messages',
			messageData,
			'chats',
			chatData
		);

		// push user to message
		history.push(`/messages/${messageId}`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Message Sent!',
				type: 'success',
			})
		);
	};

	if (showForm) {
		return (
			<Modal
				content={<NewMessageForm send={sendMessage} />}
				closeModal={toggleForm}
				// full={true}
			/>
		);
	}

	return (
		<div className="Notifications-Page">
			<div className="Notifications__Header Body-Header">
				<div className="Notifications">
					<h5
						id="notifications"
						className={
							active === 'notifications'
								? 'mate-text-primary'
								: 'mate-text-active'
						}
						onClick={toggleActive}>
						Notifications
					</h5>
				</div>
				<div className="Messages">
					<h5
						id="messages"
						className={
							active === 'messages' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleActive}>
						Messages
					</h5>
				</div>
			</div>
			<div className="Notifications__Body">{PageBody}</div>
		</div>
	);
}

export default Notifications;
