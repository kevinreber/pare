/** Dependencies */
import React, { useState } from 'react';

/** Components & Helpers */
import './Autocomplete.css';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';

function Autocomplete({
	id,
	onChange,
	name,
	value,
	label,
	options,
	type,
	placeholder,
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

	/** Build list of autofill options */
	let optionList;
	if (showOptions && value) {
		optionList = filteredOptions.length ? (
			<ul className="options">
				{filteredOptions.map((option) => {
					return (
						<li
							id={option.id}
							key={`${option.abbreviation}-${option.course_number}`}
							className="option"
							data-name={name}
							data-value={`${option.abbreviation} ${option.course_number}`}
							onClick={onClick}>
							{`${option.abbreviation} ${option.course_number}`}
						</li>
					);
				})}
			</ul>
		) : (
			<div className="no-options">
				<em>No Matches</em>
			</div>
		);
	}

	return (
		<div className="Autocomplete form-group">
			{/* <label htmlFor={id} className='float-left'>
				{label}
			</label> */}
			<div className="Search__Icon">
				<SearchIcon />
			</div>
			<input
				id={id}
				className="form-control mate-form-input"
				type="text"
				onChange={onSearch}
				name={name}
				value={value}
				autoComplete="off"
				placeholder={placeholder}
			/>
			{optionList}
		</div>
	);
}

export default Autocomplete;
