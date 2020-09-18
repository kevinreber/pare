/** Dependencies */
import React, { useState, useEffect } from 'react';

/** Components & Helpers */
import db from '../../config/fbConfig';
import './styles/Autocomplete.css';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';

function AutocompleteUsers({
	id,
	onChange,
	name,
	value,
	options,
	placeholder,
	setId,
}) {
	const [usersList, setUsersList] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);

	/** Get Users */
	useEffect(() => {
		db.collection('users').onSnapshot((snapshot) =>
			setUsersList(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	/** Commit onChange changes and filter through options */
	function onSearch(e) {
		onChange(e);
		setShowOptions(true);
		let opts = usersList.filter(
			(user) =>
				user.data.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1
		);

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
			<ul className='options'>
				{filteredOptions.map((option) => {
					return (
						<li
							id={option.id}
							className='option'
							data-name={name}
							data-value={option.data.displayName}
							onClick={onClick}>
							{option.data.displayName}
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
		<div className='Autocomplete form-group'>
			<div className='Search__Icon'>
				<SearchIcon />
			</div>
			<input
				id={id}
				className='form-control mate-form-input'
				type='text'
				onChange={onSearch}
				name={name}
				value={value}
				autoComplete='off'
				placeholder={placeholder}
				required
			/>
			{optionList}
		</div>
	);
}

export default AutocompleteUsers;
