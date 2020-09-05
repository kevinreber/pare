import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';

function PostCard({
	id,
	key,
	title,
	username,
	userId,
	avatar,
	description,
	location,
	type,
	start,
	end,
	attachment_preview,
	attachment,
	timestamp,
	comments,
	isBookmarked = false,
}) {
	const BookmarkStatus = !isBookmarked ? (
		<BookmarkBorderOutlinedIcon />
	) : (
		<BookmarkIcon />
	);

	const convertedTimestamp = moment(timestamp.toDate())
		.startOf('day')
		.fromNow();

	/** converts time */
	const convertTime = (time) => {
		// const converted = new Date(time?.toDate()).toUTCString();
		return moment(time.toDate()).calendar();
	};

	const eventTime =
		start && end ? (
			<>
				<p className='event__time'>
					Start: <span className='event__timestamp'> {convertTime(start)}</span>
				</p>
				<p className='event__time'>
					Ends: <span className='event__timestamp'> {convertTime(end)}</span>
				</p>
			</>
		) : (
			''
		);

	return (
		<div key={key} className='Post-Card'>
			<div className='Post-Card__Main'>
				<div className='Post-Card__Left'>
					<Link to={`/users/${userId}`} className='mate-text-secondary'>
						<Avatar alt={username} src={avatar} />
					</Link>
				</div>
				<div className='Post-Card__Center'>
					<Link to={`/post/${id}`}>
						<div className='Post-Card__Header'>
							<h5>{title}</h5>
							<span className='mate-text-secondary username'>{username}</span>
						</div>
						<div className='Post-Card__Body mate-text-secondary'>
							<p>{description}</p>
							<span className='location'>{location}</span>
							<span>{eventTime}</span>
						</div>
					</Link>
				</div>
			</div>
			<div className='Post-Card__Footer'>
				<IconButton>
					<ModeCommentOutlinedIcon />
				</IconButton>
				<IconButton>
					<CalendarTodayOutlinedIcon />
				</IconButton>
				<IconButton>{BookmarkStatus}</IconButton>
				<IconButton>
					<SendIcon />
				</IconButton>
				<IconButton>
					<ShareIcon />
				</IconButton>
			</div>
			<div className='Post-Card__Right Post__timestamp'>
				<p>{convertedTimestamp}</p>
			</div>
		</div>
	);
}

export default PostCard;
