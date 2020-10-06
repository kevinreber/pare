/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import PopoverActions from '../general/PopoverActions';
import PopoverShareAction from '../general/PopoverShareAction';
import { addFlashMessage } from '../../store/actions/flashMessages';

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
import Avatar from '@material-ui/core/Avatar';

/** ! TEMP URL */
const HOST_URL = 'localhost:3000';

/** PostCard
 *  If user created Post, they will see an option to delete the Post
 *  Feed -> FeedList -> PostCard
 */
function PostCard({
	id,
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
	remove,
	edit,
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
				<p className="event__time">
					Start: <span className="event__timestamp"> {convertTime(start)}</span>
				</p>
				<p className="event__time">
					Ends: <span className="event__timestamp"> {convertTime(end)}</span>
				</p>
			</>
		) : null;

	const showAttachment = attachment ? (
		<img
			className="Post-Card__Attachment"
			src={attachment_preview}
			alt={attachment.name}
		/>
	) : null;

	const deletePost = () => {
		remove(id);
	};

	const editPost = () => {
		edit(id);
	};

	// Copies link of post to browser clipboard
	const copyLinkToClipBoard = async (link) => {
		try {
			await navigator.clipboard.writeText(link);
			/** Prompt change made */
			dispatch(
				addFlashMessage({
					isOpen: true,
					message: 'Copied to Clipboard!',
					type: 'success',
				})
			);
		} catch (err) {
			/** Prompt change made */
			dispatch(
				addFlashMessage({
					isOpen: true,
					message: 'Error!',
					type: 'danger',
				})
			);
		}
		// close share popover after copy to clipboard
		handleShareClose();
	};

	/** PopoverActions Props for Admin ***************/
	const [anchorEl, setAnchorEl] = useState(null);
	const togglePopover = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const popoverId = open ? 'simple-popover' : undefined;
	/************************************* */

	/** PopoverActions Props for Share Icon***************/
	const [shareAnchorEl, setShareAnchorEl] = useState(null);
	const toggleSharePopover = (e) => {
		setShareAnchorEl(e.currentTarget);
	};
	const handleShareClose = () => setShareAnchorEl(null);
	const openShare = Boolean(shareAnchorEl);
	const popoverShareId = open ? 'simple-popover' : undefined;
	/************************************* */

	return (
		<div id={id} className="Post-Card">
			<div className="Post-Card__Main">
				<div className="Post-Card__Left">
					<Link to={`/users/${userId}`}>
						<Avatar alt={username} src={avatar} />
					</Link>
				</div>
				<div className="Post-Card__Center">
					<Link to={`/post/${id}`}>
						<div className="Post-Card__Header">
							<h5>{title}</h5>
							<span className="mate-text-secondary username">{username}</span>
						</div>
						<div className="Post-Card__Body mate-text-secondary">
							<p className="description">{description}</p>
							{showAttachment}
							{location ? (
								<span className="location">
									<LocationOnIcon />
									{location}
								</span>
							) : null}
							<span>{eventTime}</span>
						</div>
					</Link>
				</div>
			</div>
			<div className="Post-Card__Footer">
				<IconButton>
					<Link to={`/post/${id}`}>
						<ModeCommentOutlinedIcon />
						{comments ? (
							<span className="number-of-comments">{comments}</span>
						) : null}
					</Link>
				</IconButton>
				<IconButton>
					<CalendarTodayOutlinedIcon />
				</IconButton>
				<IconButton>{BookmarkStatus}</IconButton>
				<IconButton>
					<SendIcon />
				</IconButton>
				<IconButton onClick={toggleSharePopover}>
					<ShareIcon />
				</IconButton>
				<PopoverShareAction
					id={popoverShareId}
					open={openShare}
					anchorEl={shareAnchorEl}
					close={handleShareClose}
					shareLink={() => copyLinkToClipBoard(`${HOST_URL}/post/${id}`)}
				/>
			</div>
			<div className="Post-Card__Right Post__timestamp">
				<p>
					{timestamp
						? moment(timestamp.toDate()).startOf('day').fromNow()
						: null}
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
				) : null}
			</div>
		</div>
	);
}

export default PostCard;
