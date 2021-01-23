/** Dependencies */
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

import { AutocompleteTypes, StudyGroupTypes } from '../../interfaces';

const AutocompleteStudyGroups = ({
	id,
	onChange,
	name,
	value,
	options,
	placeholder,
	setId,
	showOptions,
	toggleOptions,
}: AutocompleteTypes) => {
	// @ts-ignore
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroupChoices, setStudyGroupChoices] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);

	/** Get Users Study Groups*/
	useEffect(() => {
		// Filter all public study groups
		const publicStudyGroups = options.filter(
			(studyGroup) => !studyGroup.data.private
		);

		// Filter which Study Groups user is not currently in
		const studyGroupOptions = publicStudyGroups.filter(
			(studyGroup: StudyGroupTypes) =>
				!studyGroup.data.usersList.includes(currentUser.uid)
		);

		// @ts-ignore
		setStudyGroupChoices(studyGroupOptions);
	}, [options, currentUser]);

	/** Commit onChange changes and filter through options */
	function onSearch(e: any) {
		onChange(e);

		// @ts-ignore
		toggleOptions(true);
		let opts = studyGroupChoices.filter(
			(studyGroup: StudyGroupTypes) =>
				studyGroup.data.title.toLowerCase().indexOf(value.toLowerCase()) > -1
		);

		setFilteredOptions(opts);
	}

	function onClick(e: any) {
		setFilteredOptions([]);
		// @ts-ignore
		toggleOptions(false);
		onChange(e);
		setId(e);
	}

	/** Build list of autofill options */
	let optionList;
	if (showOptions && value) {
		optionList = filteredOptions.length ? (
			<ul className="options">
				{filteredOptions.map((option: StudyGroupTypes) => {
					return (
						<li
							id={option.id}
							key={option.id}
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
};

export default memo(AutocompleteStudyGroups);
