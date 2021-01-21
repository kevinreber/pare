/** Dependencies */
import React, { useState, useEffect, useCallback, memo } from 'react';
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
import { FB, MESSAGE, CONFIRM } from './constants';
import db from '../../config/fbConfig';
import './Messages.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Avatar from '@material-ui/core/Avatar';

interface ParamTypes {
	messageId: string;
}

interface MessageTypes {
	uid: string;
	content: string;
	createdAt: Date;
}

interface ReceiverIdTypes {
	receiverId: string;
}

/** Displays Chat History of Message
 * Messages
 */
export const Messages = memo(
	(): JSX.Element => {
		const history = useHistory();
		const dispatch = useDispatch();
		const { messageId } = useParams<ParamTypes>();
		// @ts-ignore
		const currentUser = useSelector((state) => state.auth.user);
		const [isLoading, setIsLoading] = useState(true);

		const [messageData, setMessageData] = useState(null);
		const [chats, setChats] = useState([]);

		const [receiverId, setReceiverId] = useState<ReceiverIdTypes | null>(null);
		const [receiver, setReceiver] = useState({});

		const [confirmDialog, setConfirmDialog] = useState({
			isOpen: false,
			title: '',
			subtitle: '',
		});

		/** PopoverActions Props ***************/
		const [anchorEl, setAnchorEl] = useState(null);
		// @ts-ignore
		const togglePopover = (e): void => {
			setAnchorEl(e.currentTarget);
		};
		const handleClose = (): void => setAnchorEl(null);
		const open = Boolean(anchorEl);
		const popoverId = open ? 'simple-popover' : undefined;
		/************************************* */

		/** Scroll to Bottom of Chat */
		const setRef = useCallback((node): void => {
			if (node) {
				node.scrollIntoView({ smooth: true });
			}
		}, []);

		useEffect(() => {
			const getData = () => {
				if (messageId) {
					/** Get Message Info */
					db.collection(FB.messages)
						.doc(messageId)
						.onSnapshot((snapshot: any) => setMessageData(snapshot.data()));

					/** Get Chat Messages */
					db.collection(FB.messages)
						.doc(messageId)
						.collection(FB.chats)
						// @ts-ignore
						.orderBy(FB.orderBy, FB.order)
						.onSnapshot((snapshot: any) =>
							setChats(
								snapshot.docs.map((doc: any) => {
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
			const getReceiver = () => {
				// @ts-ignore
				const id = messageData.users.filter(
					(uid: string) => uid !== currentUser.uid
				);
				setReceiverId(id);
			};

			if (messageData && isLoading) {
				getReceiver();
			}
		}, [messageData, currentUser, isLoading]);

		// get Receiver's data
		useEffect(() => {
			if (receiverId && isLoading) {
				db.collection(FB.users)
					// @ts-ignore
					.doc(receiverId[0])
					.onSnapshot((snapshot: any) => setReceiver(snapshot.data()));

				setIsLoading(false);
			}
		}, [receiverId, isLoading]);

		/** Delete Message */
		const deleteMessage = (): void => {
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
					message: MESSAGE.deleteMessage,
					type: MESSAGE.error,
				})
			);
		};

		const sendMessage = (message: MessageTypes): void => {
			try {
				db.collection(FB.messages)
					.doc(messageId)
					.collection(FB.chats)
					.add(message);
				db.collection(FB.messages).doc(messageId).update({
					count: increment,
					lastUpdatedAt: createFbTimestamp(),
				});
			} catch (err) {
				console.log(err);
			}
		};

		/** Prompts Confirmation Dialog to Delete Post ********/
		const deleteMessagePrompt = (id: string): void => {
			setConfirmDialog({
				isOpen: true,
				// @ts-ignore
				title: `Remove message with ${receiver.displayName}`,
				subtitle: CONFIRM.subtitle,
				// @ts-ignore
				onConfirm: (): void => {
					deleteMessage();
				},
			});
		};
		/***************************************************** */

		/** Display receiver and user's chat */
		const ChatBody =
			chats && chats.length !== 0 ? (
				chats.map((message: any, index: number) => {
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
							{/* @ts-ignore */}
							<ConfirmDialog
								// @ts-ignore
								confirmDialog={confirmDialog}
								setConfirmDialog={setConfirmDialog}
								type="error"
							/>
							<div className="MessageChat__Title">
								<Link to={`/users/${receiverId}`}>
									{/* @ts-ignore */}
									<Avatar src={receiver.photoURL} alt={receiver.displayName} />
								</Link>
								{/* @ts-ignore */}
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
);
