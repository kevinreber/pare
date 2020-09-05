import React from 'react';
import NoData from '../../general/NoData';
import moment from 'moment';

/** Displays Study Group's Chat Messages
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatBody
 */
function StudyGroupChatBody({ messages, username }) {
	const List =
		messages && messages.length !== 0 ? (
			messages.map((message) => (
				<div>
					<p
						className={`StudyGroupChatBody__message chat__message ${
							username === message.name ? 'chat__receiver' : ''
						}`}>
						{username !== message.name ? (
							<span className='chat__name'>{message.name}</span>
						) : (
							''
						)}
						{message.message}
						<span className='chat__timestamp'>
							{message.timestamp
								? moment(message.timestamp.toDate()).calendar()
								: ''}
							{/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
						</span>
					</p>
				</div>
			))
		) : (
			<NoData text='messages' />
		);

	return <>{List}</>;
}

export default StudyGroupChatBody;
