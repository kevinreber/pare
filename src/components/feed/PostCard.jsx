/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import { deletePostFromFB } from '../../store/actions/posts';
import PopoverActions from '../general/PopoverActions';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';

/** PostCard
 *  If user created Post, they will see an option to delete the Post
 *  Feed -> FeedList -> PostCard
 */
function PostCard({
	id,
	key,
	title,
	username,
	userId,
	avatar,
	description,
	location = null,
	type = null,
	start = null,
	end = null,
	attachment_preview = null,
	attachment = null,
	timestamp,
	comments = null,
	isBookmarked = false,
}) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);

	const BookmarkStatus = !isBookmarked ? (
		<BookmarkBorderOutlinedIcon />
	) : (
		<BookmarkIcon />
	);

	/** converts time */
	const convertTime = (time) => {
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

	const showAttachment = attachment ? (
		<img
			className='Post-Card__Attachment'
			src={attachment_preview}
			alt={attachment.name}
		/>
	) : (
		''
	);

	const deletePost = () => {
		dispatch(deletePostFromFB(id));
	};

	const editPost = () => {
		console.log('editing..');
	};

	/** PopoverActions Props ***************/
	const [anchorEl, setAnchorEl] = useState(null);
	const togglePopover = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const popoverId = open ? 'simple-popover' : undefined;
	/************************************* */

	return (
		<div id={key} className='Post-Card'>
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
							<p className='description'>{description}</p>
							{showAttachment}
							{location ? (
								<span className='location'>
									<LocationOnIcon />
									{location}
								</span>
							) : (
								''
							)}

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
				<p>
					{timestamp ? moment(timestamp.toDate()).startOf('day').fromNow() : ''}
				</p>
				{currentUser.uid === userId ? (
					<>
						<IconButton onClick={togglePopover}>
							<MoreHorizOutlinedIcon />
						</IconButton>
						<PopoverActions
							remove={deletePost}
							edit={editPost}
							id={popoverId}
							open={open}
							anchorEl={anchorEl}
							close={handleClose}
						/>
					</>
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default PostCard;
