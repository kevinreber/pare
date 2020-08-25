import React, { useState } from 'react';
import StudyGroupChatAdmin from './StudyGroupChatAdmin';
import Modal from '../../general/Modal';
import BackButton from '../../general/BackButton';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

/** Displays Study Group's Chat Header and toggle admin settings
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatHeader
 */
function StudyGroupChatHeader({ title }) {
	const [showAdmin, setShowAdmin] = useState(false);
	const toggleAdmin = () => setShowAdmin((show) => !show);

	if (showAdmin) {
		return (
			<Modal
				content={<StudyGroupChatAdmin title={title} />}
				closeModal={toggleAdmin}
			/>
		);
	}

	return (
		<>
			<BackButton />
			<h5 className='StudyGroupChat__Title'>{title}</h5>
			<IconButton onClick={toggleAdmin}>
				<MoreHorizOutlinedIcon fontSize='small' />
			</IconButton>
		</>
	);
}

export default StudyGroupChatHeader;
