/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';
import MessageCard from './MessageCard';

/** List of Users Private Messages.
 * Notifications -> MessagesList -> MessageCard
 *
 * @param 	{array}		messages		Array of objects containing each message's data.
 * @param 	{string}	userId			String of current user's Id.
 * @param 	{function}	toggleForm		Toggle's form to create new message.
 */
function MessagesList({ messages, userId, toggleForm }) {
	const List = messages ? (
		messages.map((message) => (
			<li key={message.id}>
				<MessageCard message={message} userId={userId} />
			</li>
		))
	) : (
		<NoData text="messages" />
	);

	return (
		<>
			<div className="MessageList">
				<ul>{List}</ul>
			</div>
			<div onClick={toggleForm} className="font-italic">
				<CTAButton text="New Message" />
			</div>
		</>
	);
}

MessagesList.propTypes = {
	messages: PropTypes.array,
	userId: PropTypes.string,
	toggleForm: PropTypes.func,
};

export default MessagesList;
