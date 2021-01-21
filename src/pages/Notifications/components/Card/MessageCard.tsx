/** Dependencies */
import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

/** Components & Helpers */
import dateFromNowFormatter from '../../../../utils/dateFromNowFormatter';
import { ChatReceiver, ChatsProps, MessageCardProps } from '../../interface';
import db from '../../../../config/fbConfig';

/** MUI */
import Avatar from '@material-ui/core/Avatar';

/** Message card for Message List
 * Notifications -> MessagesList -> MessageCard
 *
 * @param 	{object}	message		Objects of message's data.
 * @param 	{string}	userId		String of current user's Id.
 */
const MessageCard = ({ message, userId }: MessageCardProps): JSX.Element => {
	const [receiverId, setReceiverId] = useState(null);
	const [chats, setChats] = useState<ChatsProps[]>([]);

	useEffect(() => {
		// get Receiver's ID
		const getReceiver = () => {
			const id = message.data.users.filter((uid: string) => uid !== userId);
			setReceiverId(id);
		};

		/** Get Chat Messages */
		const getChat = () => {
			db.collection('messages')
				.doc(message.id)
				.collection('chats')
				.orderBy('createdAt', 'desc')
				.limit(1)
				.onSnapshot((snapshot: any) => {
					setChats(snapshot.docs.map((doc: any) => doc.data()));
				});
		};

		if (message) {
			getReceiver();
			getChat();
		}
	}, [message, userId]);
	// @ts-ignore
	const [receiver, setReceiver] = useState<ChatReceiver>({});
	useEffect(() => {
		// get Receiver's data
		if (receiverId) {
			db.collection('users')
				// @ts-ignore

				.doc(receiverId[0])
				.onSnapshot((snapshot: any) => setReceiver(snapshot.data()));
		}
	}, [receiverId]);

	// Create content truncated preview of message content
	let contentPreview = null;
	if (chats.length > 0) {
		contentPreview =
			// @ts-ignore
			chats[0].content.length > 30
				? // @ts-ignore
				  chats[0].content.substr(0, 30) + '...'
				: // @ts-ignore
				  chats[0].content;
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
};

MessageCard.propTypes = {
	message: PropTypes.object,
	userId: PropTypes.string,
};

export default memo(MessageCard);
