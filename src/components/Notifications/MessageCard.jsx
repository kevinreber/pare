/** Dependencies */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/** Components & Helpers */
import db from '../../config/fbConfig';

/** MUI */
import Avatar from '@material-ui/core/Avatar';

/** Message card for Message List
 * Notifications -> MessagesList -> MessageCard
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

	return (
		<div className='MessageCard'>
			<div className='Container'>
				<div className='MessageCard__Left'>
					<Link to={`/users/${receiverId}`}>
						<Avatar src={receiver.photoUrl} alt={receiver.displayName} />
					</Link>
				</div>
				<div className='MessageCard__Center'>
					<Link to={`/messages/${message.id}`}>
						<h5>{receiver.displayName}</h5>
						{chats.length > 0 ? <p>{chats[0].content}</p> : <p>Loading...</p>}
					</Link>
				</div>
				<div className='MessageCard__Right'>
					<p>
						{moment(message.data.createdAt.toDate()).startOf('day').fromNow()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default MessageCard;
