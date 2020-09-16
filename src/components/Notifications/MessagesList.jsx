/** Dependencies */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';
import db from '../../config/fbConfig';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/** List of Users Private Messages */
function MessagesList({ messages, userId }) {
	// get receiverId

	const [receiverId, setReceiverId] = useState(null);

	useEffect(() => {
		// get Receiver's ID
		function getReceiver() {
			const users = messages.map((message) => message.data.users);
			const id = users[0].filter((uid) => uid !== userId);
			setReceiverId(id);
		}

		if (messages) {
			getReceiver();
		}
	}, [messages, userId]);

	const [receiver, setReceiver] = useState({});
	useEffect(() => {
		// get Receiver's data
		if (receiverId) {
			db.collection('users')
				.doc(receiverId[0])
				.onSnapshot((snapshot) => setReceiver(snapshot.data()));
		}
	}, [receiverId]);

	const List =
		messages && receiver ? (
			messages.map((message) => (
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
								{moment(message.data.createdAt.toDate())
									.startOf('day')
									.fromNow()}
							</p>
							{/* <p>{message.data.createdAt}</p> */}
						</div>
					</div>
				</div>
			))
		) : (
			<NoData text='messages' />
		);

	return (
		<>
			<div className='MessageList'>{List}</div>
			<CTAButton text='New Message' />
		</>
	);
}

export default MessagesList;
