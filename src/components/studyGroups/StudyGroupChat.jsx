import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../config/fbConfig';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat({ id, key, department, number, term, title }) {
	const { studyGroupId } = useParams();
	const [studyGroup, setStudyGroup] = useState({});

	useEffect(() => {
		if (studyGroupId) {
			db.collection('study-group')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));
		}
	}, [studyGroupId]);

	return (
		<>
			<h1>{studyGroup.title}</h1>
		</>
	);
}

export default StudyGroupChat;
