/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import StudyGroupChatAdmin from '../components/StudyGroupChat/StudyGroupChatAdmin';
import Modal from '../components/general/Modal';
import BackButton from '../components/general/BackButton';
import StudyGroupChatFooter from '../components/StudyGroupChat/StudyGroupChatFooter';
import createFbTimestamp from '../utils/createFbTimestamp';
import { increment } from '../config/fbConfig';
import db from '../config/fbConfig';
import './styles/StudyGroupChat.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroup, setStudyGroup] = useState({});
	const [messages, setMessages] = useState([]);

	const [showAdmin, setShowAdmin] = useState(false);
	const toggleAdmin = () => setShowAdmin((show) => !show);

	const users = useSelector((state) => state.users);

	/** Scroll to Bottom of Chat */
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(() => {
		if (studyGroupId) {
			/** Get Study Group Info */
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));

			/** Get Study Group Messages */
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.orderBy('createdAt', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);
		}
	}, [studyGroupId]);

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	if (showAdmin) {
		return (
			<Modal
				content={
					<StudyGroupChatAdmin title={studyGroup.title} members={users} />
				}
				closeModal={toggleAdmin}
				full={true}
			/>
		);
	}

	const sendMessage = (message) => {
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
			db.collection('study-group').doc(studyGroupId).update({
				count: increment,
				lastUpdatedAt: createFbTimestamp(),
			});
		} catch (err) {
			console.log(err);
		}
	};

	/** Display Study Group's Chat Messages */
	const StudyGroupChatBody =
		messages && messages.length !== 0 ? (
			messages.map((message, index) => {
				const lastMessage = messages.length - 1 === index;
				return (
					<div id={message.id} ref={lastMessage ? setRef : null}>
						<p
							className={`StudyGroupChatBody__message chat__message ${
								currentUser.uid === message.data.uid ? 'chat__receiver' : ''
							}`}>
							{currentUser.uid !== message.data.uid ? (
								<span className="chat__name">{message.data.displayName}</span>
							) : (
								''
							)}
							{message.data.message}
							<span className="chat__timestamp">
								{message.data.createdAt
									? moment(message.data.createdAt.toDate()).calendar()
									: ''}
							</span>
						</p>
					</div>
				);
			})
		) : (
			<NoData text="messages" />
		);

	return (
		<div className="StudyGroupChat">
			<div className="StudyGroupChat__Header Body-Header bottom-border-header">
				<BackButton />
				<h5 className="StudyGroupChat__Title">{studyGroup.title}</h5>
				<IconButton onClick={toggleAdmin}>
					<MoreHorizOutlinedIcon fontSize="small" />
				</IconButton>
			</div>
			<div
				id="StudyGroupChat__Body"
				className="StudyGroupChat__Body Page__Body">
				{StudyGroupChatBody}
			</div>
			<div className="StudyGroupChat__Footer">
				<StudyGroupChatFooter send={sendMessage} user={currentUser} />
			</div>
		</div>
	);
}

export default StudyGroupChat;
