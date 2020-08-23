import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudyGroupChatHeader from './StudyGroupChatHeader';
import StudyGroupChatBody from './StudyGroupChatBody';
import StudyGroupChatFooter from './StudyGroupChatFooter';
import db from '../../../config/fbConfig';
import './styles/StudyGroupChat.css';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const [studyGroup, setStudyGroup] = useState({});
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (studyGroupId) {
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));

			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [studyGroupId]);

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	const sendMessage = (message) => {
		console.log(message);
		try {
			db.collection('study-group')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='StudyGroupChat'>
			<div className='StudyGroupChat__Header Body-Header bottom-border-header'>
				<StudyGroupChatHeader title={studyGroup.title} />
			</div>
			<div className='StudyGroupChat__Body'>
				<StudyGroupChatBody messages={messages} />
			</div>
			<div className='StudyGroupChat__Footer'>
				<StudyGroupChatFooter send={sendMessage} />
			</div>
		</div>
	);
}

export default StudyGroupChat;
