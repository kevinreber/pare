/** Dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** Components & Helpers */
import CTAButton from '../general/CTAButton';
import PopoverActions from '../general/PopoverActions';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';

/** Modal for Study Group Admin
 *  Admin controls will only show if user has admin access
 *
 *  @param {string} title
 *  @param {Array} members
 *
 *  StudyGroup -> StudyGroupChat -> StudyGroupChatAdmin
 */
function StudyGroupChatAdmin({ title, members }) {
	/** PopoverActions Props ***************/
	const [anchorEl, setAnchorEl] = useState(null);
	const togglePopover = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const popoverId = open ? 'simple-popover' : undefined;
	/************************************* */

	const removeUser = () => {
		console.log('deleting...');
	};

	const editUser = () => {
		console.log('editing..');
	};

	const leaveGroup = () => {
		console.log('leaving group...');
	};

	const MembersList = members.map((member) => (
		<div className='Member__Card'>
			<div className='Member__Info'>
				<Link to={`/users/${member.id}`} className='mate-text-secondary'>
					<Avatar alt={member.name.first} src={member.image} />
					<p>{member.name.first}</p>
				</Link>
			</div>
			<div className='Member__Admin-Settings'>
				<IconButton onClick={togglePopover}>
					<MoreHorizOutlinedIcon />
				</IconButton>
				<PopoverActions
					remove={removeUser}
					edit={editUser}
					id={popoverId}
					open={open}
					anchorEl={anchorEl}
					close={handleClose}
				/>
			</div>
		</div>
	));

	return (
		<div className='StudyGroupChatAdmin'>
			<div className='Admin__Header'>
				<h5>{title}</h5>
				<IconButton>
					<EditIcon />
				</IconButton>
			</div>
			<div className='Admin__Body'>
				<div className='Admin-Members__Header'>
					<h6 className='mate-text-primary'>Group Members</h6>
					<p className='member-number'>24 Members</p>
				</div>
				<div className='Admin-Members__Add'>
					<div className='Add__Btn'>
						<IconButton>
							<AddCircleOutlineRoundedIcon />
						</IconButton>
						<p>Add Members</p>
					</div>
					<div className='Add__Btn'>
						<IconButton>
							<LinkRoundedIcon />
						</IconButton>
						<p>Share Link</p>
					</div>
				</div>
				<div className='Admin-Members__List'>{MembersList}</div>
				<div className='Admin-Members__Footer'>
					<p onClick={leaveGroup}>
						<CTAButton text='Leave Group' danger={true} />
					</p>
				</div>
			</div>
		</div>
	);
}

export default StudyGroupChatAdmin;
