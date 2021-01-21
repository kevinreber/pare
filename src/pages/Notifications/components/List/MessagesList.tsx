/** Dependencies */
import React, { memo } from 'react';
import * as PropTypes from 'prop-types';

/** Components & Helpers */
import NoData from '../../../../components/NoData/NoData';
import CTAButton from '../../../../components/CTAButton/CTAButton';
import MessageCard from '../Card/MessageCard';
import { MessageListProps } from '../../interface';

/** List of Users Private Messages.
 * Notifications -> MessagesList -> MessageCard
 *
 * @param 	{array}		messages		Array of objects containing each message's data.
 * @param 	{string}	userId			String of current user's Id.
 * @param 	{function}	toggleForm		Toggle's form to create new message.
 */
const MessagesList = ({
	messages,
	userId,
	toggleForm,
}: MessageListProps): JSX.Element => {
	const List =
		messages.length > 0 ? (
			messages.map((message) => (
				<li key={message.id}>
					<MessageCard message={message} userId={userId} />
				</li>
			))
		) : (
			<NoData text="messages" added={false} />
		);

	return (
		<>
			<div className="MessageList">
				<ul>{List}</ul>
			</div>
			<div onClick={() => toggleForm()} className="font-italic">
				<CTAButton text="New Message" />
			</div>
		</>
	);
};

MessagesList.propTypes = {
	messages: PropTypes.array,
	userId: PropTypes.string,
	toggleForm: PropTypes.func,
};

export default memo(MessagesList);
