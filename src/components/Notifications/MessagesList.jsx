/** Dependencies */
import React from 'react';

/** Components & Helpers */
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';
import MessageCard from './MessageCard';

/** List of Users Private Messages */
function MessagesList({ messages, userId }) {
	const List = messages ? (
		messages.map((message) => <MessageCard message={message} userId={userId} />)
	) : (
		<NoData text='messages' />
	);

	return (
		<>
			<div className='MessageList'>{List}</div>
			<CTAButton text='New Message' />
		</>
	);
}

export default MessagesList;
