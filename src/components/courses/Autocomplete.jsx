import React, { useState } from 'react';

function Autocomplete({
	id,
	onChange,
	name,
	value,
	label,
	options,
	type,
	setId,
}) {
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);

	/** Commit onChange changes and filter through options */
	function onSearch(e) {
		onChange(e);
		setShowOptions(true);
		const opts = options.filter((course) => {
			/** if filtering course through catalog */
			if (type === 'courses') {
				const search = `${course.abbreviation.toLowerCase()} ${
					course.course_number
				}`;
				return search.indexOf(value.toLowerCase()) > -1;
			}
		});

		setFilteredOptions(opts);
	}

	function onClick(e) {
		setFilteredOptions([]);
		setShowOptions(false);
		onChange(e);
		setId(e);
	}

	let optionList;
	if (showOptions && value) {
		optionList = filteredOptions.length ? (
			<ul className='options'>
				{filteredOptions.map((option) => {
					return (
						<li
							id={option.id}
							key={`${option.abbreviation}-${option.course_number}`}
							data-name={name}
							data-value={`${option.abbreviation} ${option.course_number}`}
							onClick={onClick}>
							{`${option.abbreviation} ${option.course_number}`}
						</li>
					);
				})}
			</ul>
		) : (
			<div className='no-options'>
				<em>No Matches</em>
			</div>
		);
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
			{optionList}
		</div>
	);
}

export default Autocomplete;
