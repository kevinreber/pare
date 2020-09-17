/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import SubmitButton from '../general/SubmitButton';
import Autocomplete from '../general/Autocomplete';
import createFbTimestamp from '../../utils/createFbTimestamp';

/** Form for user to create New Message
 *  NewMessageForm
 */
function NewMessageForm({ send, receiverId = null }) {
	const userId = useSelector((state) => state.auth.user.uid);

	const FORM_INITIAL_STATE = {
		uid: userId,
		users: [userId],
		count: 0,
		createdAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
		chats: [],
	};

	const CHAT_INITIAL_STATE = {
		content: '',
		uid: userId,
		createdAt: createFbTimestamp(),
	};

	const [formData, setFormData] = useState(FORM_INITIAL_STATE);
	const [chatData, setChatData] = useState(CHAT_INITIAL_STATE);
	const [errors, setErrors] = useState('');

	/** validates chat data */
	const validateChat = () => {
		if (chatData.content === '') {
			setErrors('Message can not be empty');
			return false;
		}
		return true;
	};

	/** Make sure user is sending message to another user and chat is not empty */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (formData.users.length < 2) {
			setErrors('User does not exist');
			return false;
		}
		if (formData.chats.length === 0) {
			setErrors('Message can not be empty');
			return false;
		}
		return true;
	};

	/** Clears both chat and form data */
	const resetFormData = () => {
		setChatData(CHAT_INITIAL_STATE);
		setFormData(FORM_INITIAL_STATE);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// if chat message is not empty, push it into formData
		if (validateChat()) {
			formData.chats.push();
			if (validateFormData()) {
				send(formData);
				resetFormData();
			}
		}
	};

	return (
		<div className='NewMessage__Form'>
			<h4>New Message</h4>
			<form onSubmit={handleSubmit}>
				<SubmitButton
					text='Send Message'
					reset={true}
					resetForm={resetFormData}
				/>
			</form>
		</div>
	);
}

export default NewMessageForm;
