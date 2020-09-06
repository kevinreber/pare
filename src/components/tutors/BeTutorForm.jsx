/** Dependencies */
import React, { useState } from 'react';

/** Components & Helpers */
import DatePicker from 'react-datepicker';
import SubmitButton from '../general/SubmitButton';
import useFields from '../../hooks/useFields';

/** MUI */
import { TextField } from '@material-ui/core';

function BeTutorForm({ user, save }) {
	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: '',
		monday: new Date(),
		tuesday: '',
		wednesday: '',
		thursday: '',
		friday: '',
		saturday: '',
		sunday: '',
	};

	// const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Handles general fields in form */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	};

	/** Handles 'dueDate' field */
	const handleDate = (e, date) => {
		const { name } = e.target;
		setFormData((fData) => ({ ...fData, [name]: date }));
	};

	/** Handles 'dueDate' field */
	// const handleMon = (date) => {
	// 	setFormData((fData) => ({ ...fData, monday: date }));
	// };

	const convert = (name, value) => ({
		target: {
			name,
			value,
		},
	});

	const handleMon = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData((fData) => ({ ...fData, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);

		// Clear state of form
		setFormData(INITIAL_STATE);
	};

	return (
		<div className='BeTutorForm'>
			<form className='container mb-3' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='keywords' className='float-left'>
						I can help in...
					</label>
					<input
						id='keywords'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='keywords'
						value={formData.keywords}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='portfolio-links' className='float-left'>
						Portfolio Links
					</label>
					<input
						id='portfolio-links'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='portfolio'
						value={formData.portfolio}
					/>
					<i class='fas fa-plus-circle'></i>
				</div>
				<DatePicker
					name='monday'
					selected={formData.monday}
					onChange={handleMon}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={30}
					timeCaption='Time'
					dateFormat='h:mm aa'
				/>
				<TextField
					name='monday'
					value={formData.monday}
					onChange={(date) => handleMon(convert('monday', date))}
					id='time'
					// label=''
					type='time'
					// defaultValue={formData.monday}
					// className={}
					InputLabelProps={{
						shrink: true,
					}}
					inputProps={{
						step: 300, // 5 min
					}}
				/>
				<div className='form-group'>
					{/* <label className='float-left'>Availability</label> */}
					<label htmlFor='monday' className='float-left'>
						Monday
					</label>
					<input
						id='monday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='monday'
						value={formData.monday}
					/>
					<label htmlFor='tuesday' className='float-left'>
						Tuesday
					</label>
					<input
						id='tuesday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='tuesday'
						value={formData.tuesday}
					/>{' '}
					<label htmlFor='wednesday' className='float-left'>
						Wednesday
					</label>
					<input
						id='wednesday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='wednesday'
						value={formData.wednesday}
					/>
					<label htmlFor='thursday' className='float-left'>
						Thursday
					</label>
					<input
						id='thursday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='thursday'
						value={formData.thursday}
					/>
					<label htmlFor='friday' className='float-left'>
						Friday
					</label>
					<input
						id='friday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='friday'
						value={formData.friday}
					/>
					<label htmlFor='saturday' className='float-left'>
						Saturday
					</label>
					<input
						id='saturday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='saturday'
						value={formData.saturday}
					/>
					<label htmlFor='sunday' className='float-left'>
						Sunday
					</label>
					<input
						id='sunday'
						className='form-control mate-form-input'
						type='text'
						onChange={handleChange}
						name='sunday'
						value={formData.sunday}
					/>
				</div>
				<SubmitButton text='Save' />
			</form>
		</div>
	);
}

export default BeTutorForm;
