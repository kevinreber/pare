import React from 'react';
import NoData from '../../general/NoData';
import BackButton from '../../general/BackButton';

/** Displays Study Group's Chat Messages
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatBody
 */
function StudyGroupChatBody({ messages }) {
	console.log(messages);
	const List =
		messages && messages.length !== 0 ? (
			messages.map((message) => <p>{message.message}</p>)
		) : (
			<NoData text='messages' />
		);

	return <>{List}</>;
}

export default StudyGroupChatBody;
