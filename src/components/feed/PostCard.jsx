import React from 'react';
import { Link } from 'react-router-dom';
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
	title,
	username,
	user_id,
	avatar,
	content,
	location,
	comments,
	timestamp,
	isBookmarked = false,
}) {
	const BookmarkStatus = !isBookmarked ? (
		<BookmarkBorderOutlinedIcon />
	) : (
		<BookmarkIcon />
	);

	return (
		<div className='Post-Card Mate-Card'>
			<div className='Post-Card__Left'>
				<Link to={`/users/${user_id}`} className='mate-text-secondary'>
					<Avatar alt={username} src={avatar} />
				</Link>
			</div>
			<div className='Post-Card__Center'>
				<Link to={`/post/${id}`}>
					<div className='Post-Card__Header'>
						<h5>{title}</h5>
						<span className='mate-text-secondary'>{username}</span>
					</div>
					<div className='Post-Card__Body mate-text-secondary'>
						<p>{content}</p>
						<span>{location}</span>
					</div>
				</Link>
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
			</div>
			<div className='Post-Card__Right'>
				<p>3hrs</p>
			</div>
		</div>
	);
}

export default PostCard;
