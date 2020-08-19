import React, { useState } from 'react';

function Autocomplete({ id, onChange, name, value, label, options, type }) {
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);

	/** Commit onChange changes and filter through options */
	function onSearch(e) {
		onChange(e);
		const opts = options.filter((course) => {
			if (type === 'courses') {
				// course.some((c) => {
				const search = `${course.abbreviation.toLowerCase()} ${
					course.course_number
				}`;
				return search.indexOf(value.toLowerCase()) > -1;
				// course.course_number.indexOf(value.toLowerCase() > -1)

				// course.abbreviation.indexOf(value.toLowerCase()) > -1
				// console.log(c);
				// return c === value;
				// })
			}
		});
		console.log(opts);
		setShowOptions(opts);
	}

	return (
		<div className='form-group'>
			<label htmlFor='courseMajor' className='float-left'>
				{label}
			</label>
			<input
				id={id}
				className='form-control mate-form-input'
				type='text'
				onChange={onSearch}
				name={name}
				value={value}
			/>
		</div>
	);
}

export default Autocomplete;
