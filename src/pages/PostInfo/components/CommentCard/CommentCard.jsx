/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import PopoverActions from '../../../../components/PopoverActions/PopoverActions';

/** MUI */
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

/** Comment Card Component
 * Feed -> FeedList -> PostCard -> CommentList -> CommentCard
 *
 * @param {string}		postId		ID of post.
 * @param {string} 		id			ID used to remove comment of post.
 * @param {string} 		message		Comment's message.
 * @param {string}		userId		ID of user who commented.
 * @param {string}		username	Username of user who commented.
 * @param {string}		avatar		Avatar of user who commented.
 * @param {object }		timestamp	Date object of when commented was created.
 * @param {function}	remove		Function to remove comment.
 * @param {function}	edit		function to edit comment.
 *
 */
function CommentCard({
	postId,
	id,
	message,
	userId,
	username,
	avatar,
	timestamp,
	remove,
	edit,
}) {
	const currentUser = useSelector((state) => state.auth.user);

	const deleteComment = () => remove(id);
	const editComment = () => edit(id);

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
		<div id={id} className="Comment-Card">
			<div className="Comment-Card__Main">
				<div className="Comment-Card__Left">
					<Link to={`/users/${userId}`} className="mate-text-secondary">
						<Avatar alt={username} src={avatar} />
					</Link>
				</div>
				<div className="Comment-Card__Center">
					<span className="mate-text-secondary username">{username}</span>
					<p className="Comment-Card__Message">{message}</p>
				</div>
			</div>
			<div className="Comment-Card__Timestamp">
				<p>
					{timestamp ? moment(timestamp.toDate()).startOf('day').fromNow() : ''}
				</p>
				{currentUser.uid === userId ? (
					<>
						<IconButton onClick={togglePopover}>
							<MoreHorizOutlinedIcon />
						</IconButton>
						<PopoverActions
							remove={deleteComment}
							edit={editComment}
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

CommentCard.propTypes = {
	postId: PropTypes.string,
	id: PropTypes.string,
	message: PropTypes.string,
	userId: PropTypes.string,
	username: PropTypes.string,
	avatar: PropTypes.string,
	timestamp: PropTypes.object,
	remove: PropTypes.func,
	edit: PropTypes.func,
};

export default CommentCard;
