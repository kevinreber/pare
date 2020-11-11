/** Dependencies */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';

/** Components & Helpers */
import EditPostForm from '../EditPostForm/EditPostForm';
import PopoverActions from '../../../../components/PopoverActions/PopoverActions';
import PopoverShareAction from '../../../../components/PopoverShareAction/PopoverShareAction';
import NewMessageForm from '../../../Notifications/components/NewMessageForm/NewMessageForm';
import Modal from '../../../../components/Modal/Modal';
import { addFlashMessage } from '../../../../store/actions/flashMessages';
import { showModalContent } from '../../../../store/actions/modal';
import createNewMessage from '../../../../utils/createNewMessage';
import dateFromNowFormatter from '../../../../utils/dateFromNowFormatter';
import copyLinkToClipBoard from '../../../../utils/copyLinkToClipBoard';

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
 *
 * @param {string}		id					Post's unique ID.
 * @param {string}		title				Post's title.
 * @param {string}		username			Username of user who created post.
 * @param {string}		userId				User's ID of user who created post.
 * @param {string}		avatar				Avatar of user who created post.
 * @param {string}		description			Post's description.
 * @param {object}		location			Post's location.
 * @param {string}		type				Post's type of event.
 * @param {date}		start				Post's event start time.
 * @param {date}		end					Post's event end time.
 * @param {file}		attachment_preview	Preview of post's attachment.
 * @param {string}		attachment			Post's attachment.
 * @param {string}		attachment_name		Post's attachment file name.
 * @param {object}		timestamp			Firebase object timestamps.
 * @param {object}		last_updated		Firebase object timestamp, stores last update on post.
 * @param {number}		comments			Number of comments post has.
 * @param {boolean}		isBookmarked		Bookmark status of post.
 * @param {function} 	remove				Function to remove post. User will only see if they made post.
 * @param {function} 	edit				Function to edit post. User will only see if they made post.
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
	attachment = '',
	attachment_name = '',
	timestamp,
	last_updated = null,
	comments = null,
	isBookmarked = false,
	remove,
	edit,
}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.auth.user);

	const [showEditForm, setShowEditForm] = useState(false);
	const [showMessageForm, setShowMessageForm] = useState(false);

	const BookmarkStatus = !isBookmarked ? (
		<BookmarkBorderOutlinedIcon />
	) : (
		<BookmarkIcon />
	);

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

	/** converts time */
	const convertTime = (time) => {
		return moment(time.toDate()).calendar();
	};

	const toggleEditForm = () => {
		// close popovers
		handleClose();
		handleShareClose();

		/** Close Grade Modal */
		dispatch(
			showModalContent({
				isOpen: false,
				content: null,
			})
		);
		setShowEditForm((show) => !show);
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

	const showAttachment =
		attachment !== '' ? (
			<img
				className="Post-Card__Attachment"
				src={attachment}
				alt={attachment_name}
			/>
		) : null;

	const deletePost = () => {
		remove(id, attachment_name);
	};

	/** Edit Post Form **************************/

	// Updates edited post's data
	const editPost = (data) => {
		edit(id, data);
		// close popover and edit form
		toggleEditForm();
	};

	if (showEditForm) {
		dispatch(
			showModalContent({
				isOpen: true,
				content: (
					<EditPostForm
						save={editPost}
						userId={userId}
						username={username}
						avatar={avatar}
						title={title}
						description={description}
						location={location}
						type={type}
						start={start}
						end={end}
						attachment_preview={attachment_preview}
						attachment={attachment}
						attachment_name={attachment_name}
						timestamp={timestamp}
						comments={comments}
					/>
				),
				full: true,
			})
		);
	}
	/******************************************** */

	/** Forward Post as Message Form **************/
	const toggleMessageForm = () => {
		setShowMessageForm((show) => !show);
	};

	const sendMessage = async (messageData, chatData) => {
		// store messageId given back
		const messageId = await createNewMessage(
			'messages',
			messageData,
			'chats',
			chatData
		);

		// push user to message
		history.push(`/messages/${messageId}`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Message Sent!',
				type: 'success',
			})
		);
	};

	if (showMessageForm) {
		return (
			<Modal
				isOpen={showMessageForm}
				content={
					<NewMessageForm
						send={sendMessage}
						content={`Check out this post at ${HOST_URL}/post/${id}!`}
						showAllUsers={true}
					/>
				}
				closeModal={toggleMessageForm}
			/>
		);
	}
	/******************************************** */

	// Copies link of post to browser clipboard
	const shareLink = () => {
		try {
			copyLinkToClipBoard(`/post/${id}`);
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
							<div className="Post-Card__Sub-Header">
								<span className="mate-text-secondary username">{username}</span>
								<span className="mate-text-secondary edited">
									{last_updated && timestamp !== last_updated ? '(Edited)' : ''}
								</span>
							</div>
						</div>
						<div className="Post-Card__Body mate-text-secondary">
							<p className="description">{description}</p>
							{showAttachment}
							{location && location.address !== '' ? (
								<span className="location">
									<LocationOnIcon />
									{location.address}
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
				<IconButton onClick={toggleMessageForm}>
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
					shareLink={shareLink}
				/>
			</div>
			<div className="Post-Card__Right Post__timestamp">
				<p>{timestamp ? dateFromNowFormatter(timestamp) : null}</p>
				{currentUser.uid === userId ? (
					<>
						<IconButton onClick={togglePopover}>
							<MoreHorizOutlinedIcon />
						</IconButton>
						<PopoverActions
							remove={deletePost}
							edit={toggleEditForm}
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

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	avatar: PropTypes.string,
	description: PropTypes.string.isRequired,
	location: PropTypes.object,
	type: PropTypes.string,
	attachment: PropTypes.string,
	attachment_name: PropTypes.string,
	timestamp: PropTypes.object,
	last_updated: PropTypes.object,
	comments: PropTypes.number,
	isBookmarked: PropTypes.bool,
	remove: PropTypes.func,
	edit: PropTypes.func,
};

export default PostCard;
