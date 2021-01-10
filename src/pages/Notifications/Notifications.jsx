/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import MessagesList from './components/MessagesList/MessagesList';
import NewMessageForm from './components/NewMessageForm/NewMessageForm';
import Modal from '../../components/Modal/Modal';
import db from '../../config/fbConfig';
import './Notifications.css';

import { addFlashMessage } from '../../store/actions/flashMessages';
import createNewMessage from '../../utils/createNewMessage';

/** User can see notifications and messages */
export function Notifications() {
	const history = useHistory();
	const currentUser = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	/** New Message Form */
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
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
				isOpen={showForm}
				content={<NewMessageForm send={sendMessage} />}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<div className="Notifications-Page">
			<div className="Notifications__Header Body-Header">
				<div className="Messages">
					<h5 id="messages" className="mate-text-primary">
						Messages
					</h5>
				</div>
			</div>
			<div className="Notifications__Body">
				<MessagesList
					messages={messages}
					userId={currentUser.uid}
					toggleForm={toggleForm}
				/>
			</div>
		</div>
	);
}
