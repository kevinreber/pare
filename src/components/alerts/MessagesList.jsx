import React, { useState } from 'react';
import MessageCard from './MessageCard';
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';

function MessagesList({ messages }) {
	const List = messages ? (
		messages.map((message) => <MessageCard message={message} />)
	) : (
		<NoData text='messages' />
	);

	return (
		<>
			<div>{List}</div>
			<CTAButton text='New Message' />
		</>
	);
}

export default MessagesList;
