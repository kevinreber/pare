/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/** Components & Helpers */
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/** List of Users Private Messages */
function MessagesList({ messages }) {
	const List = messages ? (
		messages.map((message) => (
			<div className='MessageCard'>
				<div className='Container'>
					<div className='MessageCard__Left'>
						{/* <Avatar alt={message.users[0]} src={message.users[0]} /> */}
					</div>
					<div className='MessageCard__Center'>
						<h5>{message.data.users[0]}</h5>
						<p>{message.data.chats[0].content}</p>
					</div>
					<div className='MessageCard__Right'>
						<p>
							{moment(message.data.createdAt.toDate()).startOf('day').fromNow()}
						</p>
						{/* <p>{message.data.createdAt}</p> */}
					</div>
				</div>
			</div>
		))
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
