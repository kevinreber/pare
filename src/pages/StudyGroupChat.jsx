import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudyGroupChatHeader from '../components/studyGroups/studyGroupChat/StudyGroupChatHeader';
import StudyGroupChatBody from '../components/studyGroups/studyGroupChat/StudyGroupChatBody';
import StudyGroupChatFooter from '../components/studyGroups/studyGroupChat/StudyGroupChatFooter';
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

	const lastMessage = useRef();

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
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [studyGroupId]);

	useEffect(() => {}, []);

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	/** Scroll to Bottom of Chat */
	const scrollToBottom = () => {
		// const chat = document.getElementById('StudyGroupChat__Body');
		// chat.scrollTop = chat.scrollHeight;

		lastMessage.scrollIntoView({ behavior: 'smooth' });
	};

	const sendMessage = (message) => {
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);

			console.log('scrolling...');
			scrollToBottom();
			console.log('scrolling done...');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='StudyGroupChat'>
			<div className='StudyGroupChat__Header Body-Header bottom-border-header'>
				<StudyGroupChatHeader title={studyGroup.title} />
			</div>
			<div
				id='StudyGroupChat__Body'
				className='StudyGroupChat__Body Page__Body'>
				<StudyGroupChatBody
					messages={messages}
					username={currentUser.displayName}
				/>
				<div style={{ display: 'none' }} className='Chat__Bottom'></div>
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
