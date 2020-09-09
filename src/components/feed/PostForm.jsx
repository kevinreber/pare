import React, { useState } from 'react';
import SubmitButton from '../general/SubmitButton';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import CancelIcon from '@material-ui/icons/Cancel';

/** Form for user's to create a Post
 *  Feed -> PostForm
 */
function PostForm({ save }) {
	/** Get user data */
	const user = useSelector((state) => {
		return {
			userId: state.auth.user.uid,
			username: state.auth.user.displayName,
			avatar: state.auth.user.photoURL,
		};
	});

	const INITIAL_STATE = {
		userId: user.userId,
		username: user.username,
		avatar: user.avatar,
		title: '',
		description: '',
		location: null,
		type: null,
		start: null,
		end: null,
		attachment_preview: '',
		attachment: '',
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		comments: [],
	};

	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		// Reset errors each change
		setErrors('');
		// if uploading media file, update formData
		if (e.target.files) {
			resetAttachment();
			const file = e.target.files[0];
			if (validateAttachment(file)) {
				setFormData((fData) => ({
					...fData,
					attachment_preview: URL.createObjectURL(file),
					attachment: file,
				}));
			}
		} else {
			let { name, value } = e.target;

			setFormData((fData) => ({
				...fData,
				[name]: value,
			}));
		}
	};

	/** Validates attachment and prompts error */
	const validateAttachment = (file) => {
		if (
			file.type.indexOf('image') === -1 ||
			!file.name.match(/.(jpg|jpeg|png|gif)$/i)
		) {
			setErrors('*File not supported');
			return false;
		}
		return true;
	};

	/** Reset all formData */
	const resetFormData = () => {
		setFormData(INITIAL_STATE);
	};

	/** Resets attachment data */
	const resetAttachment = () => {
		setFormData((fData) => ({
			...fData,
			attachment_preview: '',
			attachment: '',
		}));
	};

	/** Validate submitted data */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.title) {
			setErrors('*Title required');
			return false;
		}
		if (!formData.description) {
			setErrors('*Description required');
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		console.log(formData);
		e.preventDefault();
		if (validateFormData()) {
			save(formData);
			// Clear state of form
			setFormData(INITIAL_STATE);
		}
	};

	return (
		<div className='PostForm p-3'>
			<h4>New Event</h4>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title' className='float-left'>
						Title*
					</label>
					<input
						id='title'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='title'
						value={formData.title}
						maxLength='30'
						required
					/>
					<small
						className={`char-count ${
							30 - formData.title.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.title.length} characters remaining
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='description' className='float-left'>
						Description*
					</label>
					<textarea
						rows='3'
						id='description'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='description'
						value={formData.description}
						maxLength='100'
						required
					/>
					<small
						className={`char-count ${
							100 - formData.description.length <= 10 ? 'error-limit' : ''
						}`}>
						{100 - formData.description.length} characters remaining
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='location' className='float-left'>
						Location
					</label>
					<input
						id='location'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='location'
						value={formData.location}
					/>
				</div>
				<div className='form-group d-flex justify-content-between align-items-baseline'>
					<label htmlFor='type' className='float-left mr-4'>
						Type
					</label>
					<select
						id='postType'
						className='form-control mate-form-input'
						onChange={handleChange}
						name='type'
						value={formData.type}>
						<option className='option-disabled' value='' disabled selected>
							Select Type
						</option>
						<option>Networking</option>
						<option>Campus</option>
						<option>Opportunities</option>
						<option>Marketplace</option>
						<option>Events</option>
					</select>
				</div>
				<div className='form-group date-input-group align-items-baseline'>
					<label htmlFor='event-start mb-3' className='float-left'>
						Start
					</label>
					<TextField
						id='event-start'
						type='datetime-local'
						className='float-right'
						defaultValue={formData.start}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className='form-group align-items-baseline'>
					<label htmlFor='event-end' className='float-left'>
						End
					</label>
					<TextField
						id='event-end'
						type='datetime-local'
						className='float-right'
						defaultValue={formData.end}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className='PostForm__Footer'>
					<div className='message__attachments'>
						<div className='preview__attachment'>
							{formData.attachment_preview ? (
								<>
									<img
										src={formData.attachment_preview}
										alt='preview'
										className='attachment__preview'
									/>
									<IconButton onClick={resetAttachment}>
										<CancelIcon className='remove__attachment' />
									</IconButton>
								</>
							) : (
								''
							)}
						</div>
						<label htmlFor='attachment' className='attachment__label'>
							<PanoramaOutlinedIcon fontSize='large' />
						</label>
						<input
							type='file'
							id='attachment'
							style={{ display: 'none' }}
							onChange={handleChange}
						/>
					</div>
				</div>
				<SubmitButton text='Post' reset={true} resetForm={resetFormData} />
			</form>
			{errors ? (
				<div className='Form__Errors'>
					<div className='alert errors'>{errors}</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default PostForm;
