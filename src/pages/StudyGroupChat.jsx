import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NoData from '../components/general/NoData';
import StudyGroupChatHeader from '../components/StudyGroupChat/StudyGroupChatHeader';
import StudyGroupChatFooter from '../components/StudyGroupChat/StudyGroupChatFooter';
import db from '../config/fbConfig';
import './styles/StudyGroupChat.css';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroup, setStudyGroup] = useState({});
	const [messages, setMessages] = useState([]);

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
				.orderBy('timestamp', 'asc')
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

	const sendMessage = (message) => {
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
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
								currentUser.displayName === message.data.name
									? 'chat__receiver'
									: ''
							}`}>
							{currentUser.displayName !== message.data.name ? (
								<span className='chat__name'>{message.data.name}</span>
							) : (
								''
							)}
							{message.data.message}
							<span className='chat__timestamp'>
								{message.data.timestamp
									? moment(message.data.timestamp.toDate()).calendar()
									: ''}
							</span>
						</p>
					</div>
				);
			})
		) : (
			<NoData text='messages' />
		);

	return (
		<div className='StudyGroupChat'>
			<div className='StudyGroupChat__Header Body-Header bottom-border-header'>
				<StudyGroupChatHeader title={studyGroup.title} />
			</div>
			<div
				id='StudyGroupChat__Body'
				className='StudyGroupChat__Body Page__Body'>
				{StudyGroupChatBody}
			</div>
			<div className='StudyGroupChat__Footer'>
				<StudyGroupChatFooter
					send={sendMessage}
					username={currentUser.displayName}
				/>
			</div>
		</div>
	);
}

export default StudyGroupChat;
