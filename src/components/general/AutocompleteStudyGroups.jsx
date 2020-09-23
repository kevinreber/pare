/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import db from '../../config/fbConfig';
import './styles/Autocomplete.css';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

function AutocompleteStudyGroups({
	id,
	onChange,
	name,
	value,
	options,
	placeholder,
	setId,
	showOptions,
	toggleOptions,
}) {
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroupChoices, setStudyGroupChoices] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);

	/** Get Users Study Groups*/
	useEffect(() => {
		let studyGroupOptions = [];
		const publicStudyGroups = options.filter(
			(studyGroup) => !studyGroup.data.private
		);

		// Filter which Study Groups user is not currently in
		for (let studyGroup of publicStudyGroups) {
			let opt = true;
			for (let user of studyGroup.data.users) {
				if (user.uid === currentUser.uid) {
					opt = false;
				}
			}
			if (opt) {
				studyGroupOptions.push(studyGroup);
			}
		}

		setStudyGroupChoices(studyGroupOptions);
	}, [options, currentUser]);

	/** Commit onChange changes and filter through options */
	function onSearch(e) {
		onChange(e);
		console.log(e.target, value);
		toggleOptions(true);
		let opts = studyGroupChoices.filter(
			(studyGroup) =>
				studyGroup.data.title.toLowerCase().indexOf(value.toLowerCase()) > -1
		);

		setFilteredOptions(opts);
	}

	function onClick(e) {
		setFilteredOptions([]);
		toggleOptions(false);
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
							className="option User-option"
							data-name={name}
							data-value={option.data.title}
							onClick={onClick}>
							<Avatar src={option.data.title} alt={option.data.title} />
							{option.data.title}
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
				required
			/>
			{optionList}
		</div>
	);
}

export default AutocompleteStudyGroups;
