/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import db from '../../config/fbConfig';
import './styles/Autocomplete.css';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

function AutocompleteUsers({
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

	const [users, setUsers] = useState([]);
	const [messagedUsers, setMessagedUsers] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);

	/** Get Users */
	useEffect(() => {
		db.collection('users').onSnapshot((snapshot) =>
			setUsers(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	/** Get Users */
	useEffect(() => {
		if (users) {
			db.collection('messages')
				.where('users', 'array-contains', currentUser.uid)
				// .orderBy('lastUpdatedAt')
				.get()
				.then((snapshot) => {
					setMessagedUsers(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [users, currentUser]);

	/** Filter Users to avoid duplicate messages */
	useEffect(() => {
		if (messagedUsers) {
			// Set to avoid any userId repeats
			const set = new Set();

			for (let user of messagedUsers) {
				user.users.map((uid) => set.add(uid));
			}

			let options = users.filter((user) => !set.has(user.id));
			setUsersList(options);
		}
	}, [messagedUsers, users]);

	/** Commit onChange changes and filter through options */
	function onSearch(e) {
		onChange(e);
		toggleOptions(true);
		let opts = usersList.filter(
			(user) =>
				user.data.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1
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
			<ul className='options'>
				{filteredOptions.map((option) => {
					return (
						<li
							id={option.id}
							className='option User-option'
							data-name={name}
							data-value={option.data.displayName}
							onClick={onClick}>
							<Avatar
								src={option.data.photoURL}
								alt={option.data.displayName}
							/>
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
