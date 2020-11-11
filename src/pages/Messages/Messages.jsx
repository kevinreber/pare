/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../../components/NoData/NoData';
import PopoverActions from '../../components/PopoverActions/PopoverActions';
import BackButton from '../../components/BackButton/BackButton';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import MessageFooter from './components/MessageFooter/MessageFooter';
import Loader from '../../components/layout/Loader/Loader';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { increment } from '../../config/fbConfig';
import { deleteMessageFromFB } from '../../store/actions/messages';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';
import './Messages.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Avatar from '@material-ui/core/Avatar';

/** Displays Chat History of Message
 * Messages
 */
function MessageChat() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { messageId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);
	const [isLoading, setIsLoading] = useState(true);

	const [messageData, setMessageData] = useState(null);
	const [chats, setChats] = useState([]);

	const [receiverId, setReceiverId] = useState(null);
	const [receiver, setReceiver] = useState({});

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	/** PopoverActions Props ***************/
	const [anchorEl, setAnchorEl] = useState(null);
	const togglePopover = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const popoverId = open ? 'simple-popover' : undefined;
	/************************************* */

	/** Scroll to Bottom of Chat */
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(() => {
		const getData = () => {
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
		};

		if (isLoading) {
			getData();
		}
	}, [messageId, isLoading]);

	// get Receiver's ID
	useEffect(() => {
		function getReceiver() {
			const id = messageData.users.filter((uid) => uid !== currentUser.uid);
			setReceiverId(id);
		}

		if (messageData && isLoading) {
			getReceiver();
		}
	}, [messageData, currentUser, isLoading]);

	// get Receiver's data
	useEffect(() => {
		if (receiverId && isLoading) {
			db.collection('users')
				.doc(receiverId[0])
				.onSnapshot((snapshot) => setReceiver(snapshot.data()));

			setIsLoading(false);
		}
	}, [receiverId, isLoading]);

	/** Delete Message */
	const deleteMessage = () => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});

		dispatch(deleteMessageFromFB(messageId));

		// redirect user to feed and flash message
		history.push('/feed');
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Message Deleted',
				type: 'error',
			})
		);
	};

	const sendMessage = (message) => {
		try {
			db.collection('messages').doc(messageId).collection('chats').add(message);
			db.collection('messages').doc(messageId).update({
				count: increment,
				lastUpdatedAt: createFbTimestamp(),
			});
		} catch (err) {
			console.log(err);
		}
	};

	/** Prompts Confirmation Dialog to Delete Post ********/
	const deleteMessagePrompt = (id) => {
		setConfirmDialog({
			isOpen: true,
			title: `Remove message with ${receiver.displayName}`,
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				deleteMessage();
			},
		});
	};
	/***************************************************** */

	/** Display receiver and user's chat */
	const ChatBody =
		chats && chats.length !== 0 ? (
			chats.map((message, index) => {
				const lastMessage = chats.length - 1 === index;
				return (
					<li
						key={message.id}
						id={message.id}
						ref={lastMessage ? setRef : null}>
						<p
							className={`MessageChatBody__message chat__message ${
								currentUser.uid === message.data.uid ? 'chat__receiver' : ''
							}`}>
							{message.data.content}
							<span className="chat__timestamp">
								{message.data.createdAt
									? moment(message.data.createdAt.toDate()).calendar()
									: ''}
							</span>
						</p>
					</li>
				);
			})
		) : (
			<NoData text="messages" />
		);

	return (
		<div className="MessageChat">
			{receiver && !isLoading ? (
				<>
					<div className="MessageChat__Header bottom-border-header">
						<BackButton />
						<ConfirmDialog
							confirmDialog={confirmDialog}
							setConfirmDialog={setConfirmDialog}
							type="error"
						/>
						<div className="MessageChat__Title">
							<Link to={`/users/${receiverId}`}>
								<Avatar src={receiver.photoURL} alt={receiver.displayName} />
							</Link>

							<h5>{receiver.displayName}</h5>
						</div>
						<IconButton onClick={togglePopover}>
							<MoreHorizOutlinedIcon fontSize="small" />
						</IconButton>
						<PopoverActions
							remove={deleteMessagePrompt}
							id={popoverId}
							open={open}
							anchorEl={anchorEl}
							close={handleClose}
							editBtn={false}
						/>
					</div>
					<ul id="MessageChat__Body" className="MessageChat__Body Page__Body">
						{ChatBody}
					</ul>
					<div className="MessageChat__Footer">
						<MessageFooter send={sendMessage} uid={currentUser.uid} />
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}

export default MessageChat;
