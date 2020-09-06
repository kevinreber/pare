/** Dependencies */
import React from 'react';
import firebase from 'firebase';

/** Components & Helpers */
import useFields from '../../hooks/useFields';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

/** Displays Study Group's Chat Footer that allows the user to enter a message
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatFooter
 */
function StudyGroupChatFooter({ send, username }) {
	const INITIAL_STATE = {
		message: '',
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		name: username,
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Check if field is empty or white space
		if (formData.message && formData.message.trim() !== '') {
			send(formData);
			resetFormData();
		} else {
			console.log('error');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					name='message'
					onChange={handleChange}
					value={formData.message}
					type='text'
					placeholder='Type message here...'
				/>
				<div className='message__attachments'>
					{/* <i className='fas fa-camera fa-2x'></i>
					<i className='fas fa-image fa-2x'></i> */}
					{/* <IconButton>
						<CameraAltOutlinedIcon fontSize='large' />
					</IconButton>
					<IconButton>
						<PanoramaOutlinedIcon fontSize='large' />
					</IconButton> */}
					<IconButton>
						<ImageIcon fontSize='large' />
					</IconButton>
				</div>
				<IconButton
					type='submit'
					disabled={!formData.message}
					variant='contained'>
					<SendIcon />
				</IconButton>
			</form>
		</>
	);
}

export default StudyGroupChatFooter;
