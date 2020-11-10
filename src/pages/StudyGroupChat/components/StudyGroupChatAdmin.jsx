/** Dependencies */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import CTAButton from '../../../components/CTAButton/CTAButton';
import PopoverActions from '../../../components/PopoverActions/PopoverActions';
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog';
import removeUserFromCollection from '../../../utils/removeUserFromCollection';
import { addFlashMessage } from '../../../store/actions/flashMessages';
import copyLinkToClipBoard from '../../../utils/copyLinkToClipBoard';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import BlockIcon from '@material-ui/icons/Block';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';

/** Modal for Study Group Admin
 * Admin controls will only show if user has admin access.
 * StudyGroup -> StudyGroupChat -> StudyGroupChatAdmin
 *
 * @param {string}		studyGroupId	Study Group Id used to reference Study Group in DB.
 * @param {string} 		title			Title of Study Group.
 * @param {Array} 		members			Members of Study Group.
 * @param {Object}		currentUser		Current logged in user's data.
 * @param {function}	handleChange	Handles changes by updating state.
 * @param {function}	saveChanges		Saves changes made to Study Group.
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
		(member) => member.id === currentUser.uid
	)[0].data.admin;

	// Prompt to remove user
	const removeUserPrompt = (user) => {
		setConfirmDialog({
			isOpen: true,
			title: `Remove ${user.data.displayName} from Study Group?`,
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				removeUser(user.id);
			},
		});
	};

	// Remove user, using userID as reference
	const removeUser = (user) => {
		removeUserFromCollection('study-groups', studyGroupId, user);

		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Removed user from study group',
				type: 'error',
			})
		);

		// Reset UI state
		setConfirmDialog({
			isOpen: false,
			title: '',
			subtitle: '',
		});
		handleClose();
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
		removeUserFromCollection(
			'study-groups',
			studyGroupId,
			currentUser.uid,
			members
		);
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

	const shareLink = () => {
		try {
			copyLinkToClipBoard(`/study-groups/${studyGroupId}`);
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
	};

	const MembersList = members.map((member) => (
		<div key={member.id} className="Member__Card">
			<div className="Member__Info">
				<Link to={`/users/${member.data.uid}`} className="mate-text-secondary">
					<Avatar alt={member.data.displayName} src={member.data.photoURL} />
					<p>{member.data.displayName}</p>
				</Link>
			</div>
			{userAdminStatus && member.data.uid !== currentUser.uid ? (
				<div className="Member__Admin-Settings">
					<IconButton onClick={togglePopover}>
						<MoreHorizOutlinedIcon />
					</IconButton>
					<PopoverActions
						remove={() => removeUserPrompt(member)}
						id={popoverId}
						open={open}
						anchorEl={anchorEl}
						close={handleClose}
						editBtn={false}
						block={true}
					/>
				</div>
			) : null}
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

				{userAdminStatus ? (
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
				) : null}
			</div>
			<div className="Admin__Body">
				<div className="Admin-Members__Header">
					<h6 className="mate-text-primary">Group Members</h6>
					<p className="member-number">{members.length} Members</p>
				</div>
				{userAdminStatus ? (
					<div className="Admin-Members__Add">
						{/* <div className="Add__Btn">
							<IconButton>
								<AddCircleOutlineRoundedIcon />
							</IconButton>
							<p>Add Members</p>
						</div> */}
						<div className="Add__Btn">
							<IconButton onClick={shareLink}>
								<LinkRoundedIcon />
							</IconButton>
							<p>Share Link</p>
						</div>
					</div>
				) : null}
				<div className="Admin-Members__List">{MembersList}</div>
				<div className="Admin-Members__Footer">
					<ConfirmDialog
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
						type="error"
					/>
					{showEdit ? (
						<>
							<div onClick={saveEdit}>
								<CTAButton text="Save Changes" danger={false} />
							</div>
						</>
					) : (
						<>
							<div onClick={leaveGroupPrompt}>
								<CTAButton text="Leave Group" danger={true} />
							</div>
						</>
					)}
				</div>
			</div>
			<div className="alert errors">{errors}</div>
		</div>
	);
}

StudyGroupChatAdmin.propTypes = {
	studyGroupId: PropTypes.string,
	title: PropTypes.string,
	members: PropTypes.array,
	currentUser: PropTypes.object,
	handleChange: PropTypes.func,
	saveChanges: PropTypes.func,
};

export default StudyGroupChatAdmin;
