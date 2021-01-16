/** Dependencies */
import React, { useState, useCallback } from 'react';

/** Components & Helpers */
import './Autocomplete.css';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';

interface AutocompleteProps {
	id: string;
	onChange: Function;
	name: string;
	value: string;
	label: string;
	options: any;
	type: string;
	placeholder: string;
	setId: Function;
}

const AutocompleteCourses = ({
	id,
	onChange,
	name,
	value,
	label,
	options = [],
	type,
	placeholder,
	setId,
}: AutocompleteProps): JSX.Element => {
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);

	/** Commit onChange changes and filter through options */
	function onSearch(e: any) {
		onChange(e);
		setShowOptions(true);
		const opts = options.filter((course: any) => {
			/** if filtering course through catalog */
			if (type === 'courses') {
				const search = `${course.abbreviation.toLowerCase()} ${
					course.course_number
				}`;
				return search.indexOf(value.toLowerCase()) > -1;
			} else return null;
		});

		const firstTenMatches = opts.slice(0, 10);
		setFilteredOptions(firstTenMatches);
	}

	const handleClick = useCallback(
		(e: any) => {
			setFilteredOptions([]);
			setShowOptions(false);
			onChange(e);
			setId(e);
		},
		[setFilteredOptions, setShowOptions, onChange, setId]
	);

	/** Build list of autofill options */
	let optionList;
	if (showOptions && value) {
		optionList =
			filteredOptions.length > 0 ? (
				<ul className="options">
					{filteredOptions.map((option: any) => {
						return (
							<li
								id={option.id}
								key={`${option.abbreviation}-${option.course_number}`}
								className="option"
								data-name={name}
								data-value={`${option.abbreviation} ${option.course_number}`}
								onClick={handleClick}>
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
};

export default AutocompleteCourses;
