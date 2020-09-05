import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

function CommentCard({
	id,
	key,
	message,
	userId,
	username,
	avatar,
	timestamp,
}) {
	const convertedTimestamp = moment(timestamp.toDate())
		.startOf('day')
		.fromNow();

	return (
		<div id={key} className='Comment-Card'>
			<div className='Comment-Card__Main'>
				<div className='Comment-Card__Left'>
					<Link to={`/users/${userId}`} className='mate-text-secondary'>
						<Avatar alt={username} src={avatar} />
					</Link>
				</div>
				<div className='Comment-Card__Center'>
					<span className='mate-text-secondary username'>{username}</span>
					<p className='Comment-Card__Message'>{message}</p>
				</div>
			</div>
			<div className='Comment-Card__Timestamp'>
				<p>{convertedTimestamp}</p>
			</div>
		</div>
	);
}

export default CommentCard;
