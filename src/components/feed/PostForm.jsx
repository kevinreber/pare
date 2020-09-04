import React, { useState } from 'react';
import SubmitButton from '../general/SubmitButton';
import { useSelector } from 'react-redux';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

/** Form for user's to create a Post
 *  Feed -> PostForm
 */
function PostForm({ save }) {
	/** Get user data */
	const user = useSelector((state) => {
		return {
			userId: state.auth.user.uid,
			username: state.auth.user.displayName,
		};
	});

	const INITIAL_STATE = {
		userId: user.userId,
		username: user.username,
		title: '',
		description: '',
		location: null,
		type: null,
		start: null,
		end: null,
		attachment: null,
	};

	const [errors, setErrors] = useState('');

	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		let { name, value } = e.target;

		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	/** Validate submitted data */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.title) {
			setErrors('Title required');
			return false;
		}
		if (!formData.description) {
			setErrors('Description required');
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
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
				<div className='form-group'>
					<label htmlFor='type' className='float-left'>
						Type
					</label>
					<select
						id='postType'
						className='form-control mate-form-input mr-2'
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
				<div className='form-group date-input-group'>
					<label htmlFor='event-start mb-3' className='float-left'>
						Start
					</label>
					{/* <div className='float-right'> */}
					{/* <div className='form-control mate-form-input'> */}
					<TextField
						id='event-start'
						type='datetime-local'
						className='float-right'
						// defaultValue='2017-05-24T10:30'
						defaultValue={formData.start}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					{/* </div> */}

					{/* </div> */}
				</div>
				<div className='form-group'>
					<label htmlFor='event-end' className='float-left'>
						End
					</label>
					{/* <div className='float-right'> */}
					<TextField
						id='event-end'
						type='datetime-local'
						className='float-right'
						// defaultValue='2017-05-24T10:30'
						defaultValue={formData.end}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					{/* </div> */}
				</div>
				<div className='PostForm__Footer'>
					<div className='message__attachments'>
						{/* <i className='fas fa-camera fa-2x'></i>
					<i className='fas fa-image fa-2x'></i> */}
						<IconButton>
							<PanoramaOutlinedIcon fontSize='large' />
						</IconButton>
					</div>
					<SubmitButton text='Post' />
				</div>
				<div className='Form__Errors'>
					<div className='alert errors'>{errors}</div>
				</div>
			</form>
		</div>
	);
}

export default PostForm;
