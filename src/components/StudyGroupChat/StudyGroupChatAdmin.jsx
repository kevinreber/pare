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
import db from '../../config/fbConfig';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import BlockIcon from '@material-ui/icons/Block';
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
function StudyGroupChatAdmin({
	studyGroupId,
	title,
	members,
	currentUser,
	handleChange,
	saveChanges,
}) {
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

	const [errors, setErrors] = useState('');
	const [showEdit, setShowEdit] = useState(false);
	const handleEdit = (e) => {
		setErrors('');
		setShowEdit((show) => !show);
		if (showEdit === true) {
			reset('reset');
		}
	};
	// resets title
	const reset = (e) => handleChange(e);

	// if user is admin, they will see admin settings
	const userAdminStatus = members.filter(
		(member) => member.uid === currentUser.uid
	);

	const removeUser = (user) => {
		removeUserFromCollection('study-group', studyGroupId, user);
	};

	const leaveGroupPrompt = () => {
		console.log(members);
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

		removeUserFromCollection('study-group', studyGroupId, user, members);
		console.log('leaving group...');

		// redirect user to study-groups
		history.push(`/study-groups`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Left Study Group',
				type: 'error',
			})
		);
	};

	const saveEdit = () => {
		setErrors('');
		if (title === '' && title.trim() === '') {
			setErrors('*Can not leave title empty!');
		} else {
			saveChanges();
			// setShowEdit to false
			setShowEdit(false);
		}
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
						remove={() =>
							removeUser({
								uid: member.uid,
								displayName: member.displayName,
								photoURL: member.photoURL,
								admin: member.admin,
							})
						}
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
				{showEdit ? (
					<>
						<input
							className={`form-control mate-form-input editable-text editable-title ${
								showEdit ? 'show-editable' : 'hide-editable'
							}`}
							onChange={handleChange}
							name={'title'}
							value={title}
							type="text"
							maxLength="30"
							required
						/>
						<small
							className={`char-count ${
								30 - title.length <= 10 ? 'error-limit' : ''
							}`}>
							{30 - title.length} characters remaining
						</small>
					</>
				) : (
					<>
						<h5>{title}</h5>
					</>
				)}

				{userAdminStatus[0].admin ? (
					<>
						<IconButton onClick={handleEdit}>
							{showEdit ? (
								<div className="Block-Icon">
									<BlockIcon />
								</div>
							) : (
								<div className="Edit-Icon">
									<EditIcon />
								</div>
							)}
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
					{showEdit ? (
						<>
							<p onClick={saveEdit}>
								<CTAButton text="Save Changes" danger={false} />
							</p>
						</>
					) : (
						<>
							<p onClick={leaveGroupPrompt}>
								<CTAButton text="Leave Group" danger={true} />
							</p>
						</>
					)}
				</div>
			</div>
			<div className="alert errors">{errors}</div>
		</div>
	);
}

export default StudyGroupChatAdmin;
