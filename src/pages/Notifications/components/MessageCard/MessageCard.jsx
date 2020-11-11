/** Dependencies */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import dateFromNowFormatter from '../../../../utils/dateFromNowFormatter';
import db from '../../../../config/fbConfig';

/** MUI */
import Avatar from '@material-ui/core/Avatar';

/** Message card for Message List
 * Notifications -> MessagesList -> MessageCard
 *
 * @param 	{object}	message		Objects of message's data.
 * @param 	{string}	userId		String of current user's Id.
 */
function MessageCard({ message, userId }) {
	const [receiverId, setReceiverId] = useState(null);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		// get Receiver's ID
		function getReceiver() {
			const id = message.data.users.filter((uid) => uid !== userId);
			setReceiverId(id);
		}

		/** Get Chat Messages */
		function getChat() {
			db.collection('messages')
				.doc(message.id)
				.collection('chats')
				.orderBy('createdAt', 'desc')
				.limit(1)
				.onSnapshot((snapshot) => {
					setChats(snapshot.docs.map((doc) => doc.data()));
				});
		}

		if (message) {
			getReceiver();
			getChat();
		}
	}, [message, userId]);

	const [receiver, setReceiver] = useState({});
	useEffect(() => {
		// get Receiver's data
		if (receiverId) {
			db.collection('users')
				.doc(receiverId[0])
				.onSnapshot((snapshot) => setReceiver(snapshot.data()));
		}
	}, [receiverId]);

	// Create content truncated preview of message content
	let contentPreview = null;
	if (chats.length > 0) {
		contentPreview =
			chats[0].content.length > 30
				? chats[0].content.substr(0, 30) + '...'
				: chats[0].content;
	}

	return (
		<div className="MessageCard">
			<div className="Container">
				<div className="MessageCard__Left">
					<Link to={`/users/${receiverId}`}>
						<Avatar src={receiver.photoURL} alt={receiver.displayName} />
					</Link>
				</div>
				<div className="MessageCard__Center">
					<Link to={`/messages/${message.id}`}>
						<h5>{receiver.displayName}</h5>
						<p>{contentPreview}</p>
					</Link>
				</div>
				<div className="MessageCard__Right">
					<p className="timestamp">
						{dateFromNowFormatter(message.data.createdAt)}
					</p>
				</div>
			</div>
		</div>
	);
}

MessageCard.propTypes = {
	message: PropTypes.object,
	userId: PropTypes.string,
};

export default MessageCard;
