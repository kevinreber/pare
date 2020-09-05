import React from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import useFields from '../../hooks/useFields';
import IconButton from '@material-ui/core/IconButton';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

/** Re-usable Chat Footer for any features that involves submitting a message/comment */
function ChatFooter({ send, type = 'message' }) {
	const currentUser = useSelector((state) => state.auth.user);

	const INITIAL_STATE = {
		message: '',
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		username: currentUser.displayName,
		userId: currentUser.uid,
		avatar: currentUser.photoURL,
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
				<div className='message__attachments'>
					<IconButton>
						<CameraAltOutlinedIcon fontSize='large' />
					</IconButton>
					<IconButton>
						<PanoramaOutlinedIcon fontSize='large' />
					</IconButton>
				</div>
				<input
					name='message'
					onChange={handleChange}
					value={formData.message}
					type='text'
					placeholder={`Type ${type} here...`}
				/>
				<button type='submit'>Send</button>
			</form>
		</>
	);
}

export default ChatFooter;
