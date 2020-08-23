import React from 'react';
import firebase from 'firebase';
import useFields from '../../../hooks/useFields';

/** Displays Study Group's Chat Footer that allows the user to enter a message
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatFooter
 */
function StudyGroupChatFooter({ send }) {
	const INITIAL_STATE = {
		id: 7,
		message: '',
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		name: 'Tony Stark',
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
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
					<i className='fas fa-camera fa-2x'></i>
					<i className='fas fa-image fa-2x'></i>
				</div>
				<input
					name='message'
					onChange={handleChange}
					value={formData.message}
					type='text'
					placeholder='Type message here...'
				/>
				<button type='submit'>Send</button>
			</form>
		</>
	);
}

export default StudyGroupChatFooter;
