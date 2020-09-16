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
	useEffect(() => {
		// get Receiver's ID
		function getReceiver() {
			const id = message.data.users.filter((uid) => uid !== userId);
			setReceiverId(id);
		}

		if (message) {
			getReceiver();
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
						<Avatar alt={receiver.photoUrl} src={receiver.displayName} />
					</Link>
				</div>
				<div className='MessageCard__Center'>
					<h5>{receiver.displayName}</h5>
					<p>{message.data.chats[0].content}</p>
				</div>
				<div className='MessageCard__Right'>
					<p>
						{moment(message.data.createdAt.toDate()).startOf('day').fromNow()}
					</p>
					{/* <p>{message.data.createdAt}</p> */}
				</div>
			</div>
		</div>
	);
}

export default MessageCard;
