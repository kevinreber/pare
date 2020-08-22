import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudyGroupChatHeader from './StudyGroupChatHeader';
import StudyGroupChatBody from './StudyGroupChatBody';
import db from '../../../config/fbConfig';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const [studyGroup, setStudyGroup] = useState({});

	useEffect(() => {
		if (studyGroupId) {
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));
		}
	}, [studyGroupId]);

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<StudyGroupChatHeader title={studyGroup.title} />
			<StudyGroupChatBody messages={studyGroup.messages} />
		</>
	);
}

export default StudyGroupChat;
