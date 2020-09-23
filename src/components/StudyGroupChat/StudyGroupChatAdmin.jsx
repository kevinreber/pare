/** Dependencies */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import CTAButton from '../general/CTAButton';
import PopoverActions from '../general/PopoverActions';
import ConfirmDialog from '../general/ConfirmDialog';
import removeUserFromCollection from '../../utils/removeUserFromCollection';
import { addFlashMessage } from '../../store/actions/flashMessages';

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
 *  @param {Object} currentUser
 *
 *  StudyGroup -> StudyGroupChat -> StudyGroupChatAdmin
 */
function StudyGroupChatAdmin({ studyGroupId, title, members, currentUser }) {
	const history = useHistory();
	const dispatch = useDispatch();

	/** PopoverActions Props ***************/
	const [anchorEl, setAnchorEl] = useState(null);
	const togglePopover = (e) => {
		setAnchorEl(e.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);
	const open = Boolean(anchorEl);
	const popoverId = open ? 'simple-popover' : undefined;
	/************************************* */

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	// if user is admin, they will see admin settings
	const userAdminStatus = members.filter(
		(member) => member.uid === currentUser.uid
	);

	const removeUser = () => {
		console.log('deleting...');
	};

	const leaveGroupPrompt = () => {
		setConfirmDialog({
			isOpen: true,
			title: 'Are you sure you want to leave the Study Group?',
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				leaveGroup();
			},
		});
	};

	/**
	 * ! Update displayName of user's messages
	 */
	const leaveGroup = () => {
		const user = {
			uid: currentUser.uid,
			displayName: currentUser.displayName,
			photoURL: currentUser.photoURL,
			admin: userAdminStatus[0].admin,
		};

		removeUserFromCollection('study-group', studyGroupId, user);
		console.log('leaving group...');

		// push user to message
		history.push(`/study-groups/`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Left Study Group',
				type: 'error',
			})
		);
	};

	const MembersList = members.map((member) => (
		<div className="Member__Card">
			<div className="Member__Info">
				<Link to={`/users/${member.uid}`} className="mate-text-secondary">
					<Avatar alt={member.displayName} src={member.photoURL} />
					<p>{member.displayName}</p>
				</Link>
			</div>
			{userAdminStatus[0].admin && member.uid !== currentUser.uid ? (
				<div className="Member__Admin-Settings">
					<IconButton onClick={togglePopover}>
						<MoreHorizOutlinedIcon />
					</IconButton>
					<PopoverActions
						remove={removeUser}
						id={popoverId}
						open={open}
						anchorEl={anchorEl}
						close={handleClose}
						editBtn={false}
						block={true}
					/>
				</div>
			) : (
				''
			)}
		</div>
	));

	return (
		<div className="StudyGroupChatAdmin">
			<div className="Admin__Header">
				<h5>{title}</h5>
				{userAdminStatus[0].admin ? (
					<>
						<IconButton>
							<EditIcon />
						</IconButton>
					</>
				) : (
					''
				)}
			</div>
			<div className="Admin__Body">
				<div className="Admin-Members__Header">
					<h6 className="mate-text-primary">Group Members</h6>
					<p className="member-number">{members.length} Members</p>
				</div>
				{userAdminStatus[0].admin ? (
					<div className="Admin-Members__Add">
						<div className="Add__Btn">
							<IconButton>
								<AddCircleOutlineRoundedIcon />
							</IconButton>
							<p>Add Members</p>
						</div>
						<div className="Add__Btn">
							<IconButton>
								<LinkRoundedIcon />
							</IconButton>
							<p>Share Link</p>
						</div>
					</div>
				) : (
					''
				)}
				<div className="Admin-Members__List">{MembersList}</div>
				<div className="Admin-Members__Footer">
					<ConfirmDialog
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
						type="error"
					/>
					<p onClick={leaveGroupPrompt}>
						<CTAButton text="Leave Group" danger={true} />
					</p>
				</div>
			</div>
		</div>
	);
}

export default StudyGroupChatAdmin;
