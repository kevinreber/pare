import React from 'react';
import NoData from '../../general/NoData';

/** Displays Study Group's Chat Messages
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatBody
 */
function StudyGroupChatBody({ messages }) {
	console.log(messages);
	const List =
		messages && messages.length !== 0 ? (
			messages.map((message) => (
				<p
					className={`StudyGroupChatBody__message chat__message ${
						true ? 'chat__receiver' : ''
					}`}>
					<span className='chat__name'>{message.name}</span>
					{message.message}
					<span className='chat__timestamp'>
						{new Date(message.timestamp?.toDate()).toUTCString()}
					</span>
				</p>
			))
		) : (
			<NoData text='messages' />
		);

	return <>{List}</>;
}

export default StudyGroupChatBody;
