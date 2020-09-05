import React from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import useFields from '../../hooks/useFields';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';

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
				<input
					name='message'
					onChange={handleChange}
					value={formData.message}
					type='text'
					placeholder={`Type ${type} here...`}
				/>
				<div className='message__attachments'>
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

export default ChatFooter;
