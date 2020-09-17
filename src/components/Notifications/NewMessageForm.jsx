/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import SubmitButton from '../general/SubmitButton';
import createFbTimestamp from '../../utils/createFbTimestamp';
import db from '../../config/fbConfig';
import './styles/NewMessageForm.css';

/** MUI */
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

	const [users, setUsers] = useState([]);
	const [receiverUser, setReceiverUser] = useState(receiverId);
	const [formData, setFormData] = useState(FORM_INITIAL_STATE);
	const [chatData, setChatData] = useState(CHAT_INITIAL_STATE);
	const [errors, setErrors] = useState('');

	/** Get Users */
	useEffect(() => {
		db.collection('users')
			// .orderBy('', 'desc')
			.onSnapshot((snapshot) =>
				setUsers(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
	}, []);

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

	/** Stores userId in state */
	// const setId = (e) => {
	// 	let { id } = e.target;

	// 	setFormData((fData) => ({
	// 		...fData,
	// 		courseId: id,
	// 	}));
	// };

	const addReceiver = (e) => {
		console.log(e);
	};

	/** Clears both chat and form data */
	const resetFormData = () => {
		setChatData(CHAT_INITIAL_STATE);
		setFormData(FORM_INITIAL_STATE);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target);

		// if receiverUser and chat message are not empty, push chat into formData
		// if (receiverUser && validateChat()) {
		// 	formData.chats.push(chatData);
		// 	if (validateFormData()) {
		// 		send(formData);
		// 		resetFormData();
		// 	}
		// }
	};

	const handleChatChange = (e) => {
		const { name, value } = e.target;
		setChatData((fData) => ({ ...fData, [name]: value }));
	};

	return (
		<div className='NewMessage__Form'>
			<h4>New Message</h4>
			<form onSubmit={handleSubmit}>
				<Autocomplete
					id='receiver'
					// receiver
					options={users.map((option) => option.data.displayName)}
					renderInput={(params) => (
						<TextField
							{...params}
							// label='receiver'
							// margin='normal'
							variant='outlined'
						/>
					)}
				/>
				<div className='form-group'>
					{/* <label htmlFor='description' className='float-left'>
						Message
					</label> */}
					<textarea
						rows='3'
						id='content'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChatChange}
						name='content'
						value={chatData.content}
						required
					/>
				</div>
				<div className='alert errors'>{errors}</div>
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
