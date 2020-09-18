/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../components/general/NoData';
// import MessageAdmin from '';
import Modal from '../components/general/Modal';
import BackButton from '../components/general/BackButton';
import MessageFooter from '../components/Messages/MessageFooter';
import db from '../config/fbConfig';
import './styles/Messages.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Avatar from '@material-ui/core/Avatar';

/** Displays Chat History of Message
 * Messages
 */
function MessageChat() {
	const { messageId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);

	const [messageData, setMessageData] = useState(null);
	const [chats, setChats] = useState([]);

	const [receiverId, setReceiverId] = useState(null);
	const [receiver, setReceiver] = useState({});

	const [showAdmin, setShowAdmin] = useState(false);
	const toggleAdmin = () => setShowAdmin((show) => !show);

	/** Scroll to Bottom of Chat */
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(() => {
		if (messageId) {
			/** Get Message Info */
			db.collection('messages')
				.doc(messageId)
				.onSnapshot((snapshot) => setMessageData(snapshot.data()));

			/** Get Chat Messages */
			db.collection('messages')
				.doc(messageId)
				.collection('chats')
				.orderBy('createdAt', 'asc')
				.onSnapshot((snapshot) =>
					setChats(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);
		}
	}, [messageId]);

	// get Receiver's ID
	useEffect(() => {
		function getReceiver() {
			console.log(messageData);
			const id = messageData.users.filter((uid) => uid !== currentUser.uid);
			setReceiverId(id);
		}

		if (messageData) {
			getReceiver();
		}
	}, [messageData, currentUser]);

	// get Receiver's data
	useEffect(() => {
		if (receiverId) {
			db.collection('users')
				.doc(receiverId[0])
				.onSnapshot((snapshot) => setReceiver(snapshot.data()));
		}
	}, [receiverId]);

	if (!messageData) {
		return <p>Loading...</p>;
	}

	// if (showAdmin) {
	// 	return (
	// 		<Modal
	// 			content={
	// 				<StudyGroupChatAdmin title={messageGroup.title} members={users} />
	// 			}
	// 			closeModal={toggleAdmin}
	// 			full={true}
	// 		/>
	// 	);
	// }

	const sendMessage = (message) => {
		try {
			db.collection('messages').doc(messageId).collection('chat').add(message);
		} catch (err) {
			console.log(err);
		}
	};

	/** Display receiver and user's chat */
	const ChatBody =
		chats && chats.length !== 0 ? (
			chats.map((message, index) => {
				const lastMessage = chats.length - 1 === index;
				return (
					<div id={message.index} ref={lastMessage ? setRef : null}>
						<p
							className={`MessageChatBody__message chat__message ${
								currentUser.uid === message.data.uid ? 'chat__receiver' : ''
							}`}>
							{message.data.content}
							<span className='chat__timestamp'>
								{message.data.createdAt
									? moment(message.data.createdAt.toDate()).calendar()
									: ''}
							</span>
						</p>
					</div>
				);
			})
		) : (
			<NoData text='messages' />
		);

	console.log(receiver);

	return (
		<div className='MessageChat'>
			{receiver ? (
				<>
					<div className='MessageChat__Header bottom-border-header'>
						<BackButton />
						<div className='MessageChat__Title'>
							<Link to={`/users/${receiverId}`}>
								<Avatar src={receiver.photoUrl} alt={receiver.displayName} />
							</Link>

							<h5>{receiver.displayName}</h5>
						</div>
						<IconButton onClick={toggleAdmin}>
							<MoreHorizOutlinedIcon fontSize='small' />
						</IconButton>
					</div>
					<div id='MessageChat__Body' className='MessageChat__Body Page__Body'>
						{ChatBody}
					</div>
					<div className='MessageChat__Footer'>
						<MessageFooter send={sendMessage} username={currentUser.uid} />
					</div>
				</>
			) : (
				''
			)}
		</div>
	);
}

export default MessageChat;
