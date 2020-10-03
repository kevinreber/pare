/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import PopoverActions from '../general/PopoverActions';

/** MUI */
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

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
				) : (
					''
				)}
			</div>
		</div>
	);
}

export default CommentCard;
