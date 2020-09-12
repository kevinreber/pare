/** Dependencies */
import React, { useState } from 'react';
import moment from 'moment';
import { original, produce } from 'immer';

/** Components & Helpers */
import DatePicker from 'react-datepicker';
import CTAButton from '../general/CTAButton';
import SubmitButton from '../general/SubmitButton';
import useFields from '../../hooks/useFields';

/** MUI */
import { IconButton } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

function BeTutorForm({ user, update }) {
	// Form Data
	const INITIAL_STATE = {
		keywords: '',
		portfolio: '',
	};
	// console.log(availability);
	// const INITIAL_AVAIL = {
	// 	monday: [
	// 		{ start: moment(new Date()).format(), end: moment(new Date()).format() },
	// 	],
	// 	tuesday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// 	wednesday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// 	thursday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// 	friday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// 	saturday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// 	sunday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	// };

	// const INITIAL_AVAIL = {
	// 	monday: {
	// 		start: moment(new Date()).format(),
	// 		end: moment(new Date()).format(),
	// 	},
	// 	tuesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	wednesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	thursday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	friday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	saturday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	sunday: { start: new Date().getTime(), end: new Date().getTime() },
	// };

	const INITIAL_AVAIL = {
		mondayStart: moment(new Date()).format(),
		mondayEnd: moment(new Date()).format(),
		tuesdayStart: new Date().getTime(),
		tuesdayEnd: new Date().getTime(),
		wednesdayStart: new Date().getTime(),
		wednesdayEnd: new Date().getTime(),
		thursdayStart: new Date().getTime(),
		thursdayEnd: new Date().getTime(),
		fridayStart: new Date().getTime(),
		fridayEnd: new Date().getTime(),
		saturdayStart: new Date().getTime(),
		saturdayEnd: new Date().getTime(),
		sundayStart: new Date().getTime(),
		sundayEnd: new Date().getTime(),
	};

	// const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const [formData, setFormData] = useState(INITIAL_STATE);

	const [availability, setAvailability] = useState(INITIAL_AVAIL);

	const [changeMade, setChangeMade] = useState(false);
	// const availability = {
	// 	monday: {
	// 		start: moment(new Date()).format(),
	// 		end: moment(new Date()).format(),
	// 	},
	// 	tuesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	wednesday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	thursday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	friday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	saturday: { start: new Date().getTime(), end: new Date().getTime() },
	// 	sunday: { start: new Date().getTime(), end: new Date().getTime() },
	// };

	/** Handles general fields in form */
	const handleChange = (e) => {
		if (!changeMade) setChangeMade(true);
		console.log(e.target);
		if (e.target.name) {
			const { name, value } = e.target;
			setFormData((fData) => ({ ...fData, [name]: value }));
		}
	};

	if (changeMade && formData.keywords === '' && formData.portfolio === '') {
		setChangeMade(false);
	}

	const handleDate = (e, day, type, index) => {
		// const val = e.target.value;
		// const time = moment(val, 'HH:mm');
		// const t = time._i;
		// console.log(val);
		// console.log(t);

		// const time = moment(e, 'dddd, HH:mm');
		// const val = time._i;

		const time = moment(e).format();
		console.log(time);
		setAvailability((fData) => ({
			...fData,
			// [`${day}${type}`]: moment(e).format(),
			[`${day}${type}`]: moment(time),
		}));
		/**
		 return produce(availability, (draft) => {
			 let copy = original(draft);
			 // const date = moment(new Date(e)).format();
			 // console.log(e);
			 // return (copy[day][type] = e);
			 return (copy[`${day}${type}`] = e);
			});
			*/
	};

	// const handleDate = (e, day, type, index) => {
	// 	console.log(e, day, type, index);
	// 	console.log(moment(e).format());
	// 	// const date = new Date(e);
	// 	// const time = date.getTime();
	// 	// console.log(date, date.getTime());
	// 	// if (type === 'start') {
	// setAvailability((fData) => ({
	// 	...fData,
	// 	[day.start]: moment(e).format(),
	// }));
	// 	// } else if (type === 'end') {
	// 	// 	setFormData((fData) => ({ ...fData, [day[0]['end']]: e }));
	// 	// }
	// 	console.log(availability[day][type]);
	// };

	const convert = (name, value) => ({
		target: {
			name,
			value,
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		update(formData);

		// Clear state of form
		setFormData(INITIAL_STATE);
	};

	// 'Start' and 'End' Time Pickers
	const timePickers = (day, index) => (
		<>
			<TimePicker
				clearable
				variant='inline'
				minutesStep={5}
				label={day.charAt(0).toUpperCase() + day.slice(1)}
				// name={day['start']}
				value={availability[`${day}Start`]}
				// value={availability[day].start}
				onChange={(e) => handleDate(e, day, 'Start', index)}
			/>
			<TimePicker
				clearable
				variant='inline'
				minutesStep={5}
				// name={day['end']}
				value={availability[`${day}End`]}
				// value={availability[day].end}
				onChange={(e) => handleDate(e, day, 'End', index)}
			/>

			{/* Default HTML Input fields */}
			{/* <div className='form-group'>
				<label htmlFor={day} className='float-left'>
					{day.charAt(0).toUpperCase() + day.slice(1)}
				</label>
				<input
					className='form-control mate-form-input'
					type='time'
					onChange={(e) => handleDate(e, day, 'start', index)}
					name={day}
					value={availability[day].start}
				/>
			</div>
			<div className='form-group'>
				<input
					className='form-control mate-form-input'
					type='time'
					onChange={(e) => handleDate(e, day, 'end', index)}
					name={day}
					value={availability[day].end}
				/>
			</div> */}
			<div className='Availability__Remove'>
				<IconButton>
					<RemoveCircleOutlineSharpIcon />
				</IconButton>
			</div>
		</>
	);

	// Build Fields for Availability
	const dayFields = DAYS.map((day, index) => (
		<div className='Availability__Day'>
			<div className='Availability__TimePicker'>{timePickers(day, index)}</div>
			<div className='Availability__Add'>
				<IconButton>
					<AddCircleOutlineRoundedIcon />
				</IconButton>
				{/* <KeyboardTimePicker
				margin='normal'
				id='time-picker'
				label='Time picker'
				value={formData[day]}
				onChange={handleChange}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/> */}
			</div>
		</div>
	));

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
				<div className='form-group BeTutor__Portfolio'>
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
					<div className='Portfolio__Add'>
						<IconButton>
							<AddCircleOutlineRoundedIcon />
						</IconButton>
					</div>
				</div>
				<div className='Be-Tutor__Availability'>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						{dayFields}
					</MuiPickersUtilsProvider>
				</div>
				<div className={`Search__Footer ${!changeMade ? 'disabled-btn' : ''}`}>
					<CTAButton text='Save' />
				</div>
			</form>
		</div>
	);
}

export default BeTutorForm;
