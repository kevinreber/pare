/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import db from '../../../../config/fbConfig';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

/** Autocomplete list of users.
 *
 * @param 	{string} 	id 				Identifier id for input id.
 * @param 	{function} 	onChange 		Handle's changes on input state values.
 * @param 	{string} 	name 			Name for input element.
 * @param 	{string} 	value 			Input value of user receiving message.
 * @param 	{array} 	options 		Array of objects to display and filter options.
 * @param 	{string} 	placeholder 	Placeholder text for input element.
 * @param 	{function} 	setId 			Function to store state of receiving user's Id.
 * @param 	{boolean} 	showOptions 	Boolean to show autocomplete list of optional users.
 * @param 	{function} 	toggleOption 	Toggles showOptions.
 * @param	{object}	receiver		Receiving user data.
 * @param 	{boolean}	receiverChosen	Boolean if receiving user has been chosen.
 * @param	{function}	clearData		Clears state of receiving user.
 * @param 	{boolean}	allUsers		Boolean to show all users or filter users to be displayed.
 */
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
	receiver,
	receiverChosen,
	clearData,
	allUsers = false,
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

	/** Get Messaged Users */
	useEffect(() => {
		if (users && !allUsers) {
			db.collection('messages')
				.where('users', 'array-contains', currentUser.uid)
				// .orderBy('lastUpdatedAt')
				.get()
				.then((snapshot) => {
					setMessagedUsers(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [users, currentUser, allUsers]);

	/** Filter Users to avoid duplicate messages */
	useEffect(() => {
		if (messagedUsers && !allUsers) {
			// Set to avoid any userId repeats
			const set = new Set();

			for (let user of messagedUsers) {
				user.users.map((uid) => set.add(uid));
			}

			let options = users.filter((user) => !set.has(user.id));
			setUsersList(options);
		} else if (allUsers) setUsersList(users);
	}, [messagedUsers, users, allUsers]);

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

	function handleClick(id, displayName, photoURL) {
		setFilteredOptions([]);
		toggleOptions(false);
		const data = {
			displayName,
			photoURL,
		};
		onChange(null, data);
		setId(id);
	}

	/** Build list of autofill options */
	let optionList;
	if (showOptions && value) {
		optionList = filteredOptions.length ? (
			<ul className="options">
				{filteredOptions.map((option) => {
					return (
						<li
							key={option.id}
							id={option.id}
							className="option User-option"
							data-name={name}
							data-value={option.data.displayName}
							onClick={() =>
								handleClick(
									option.id,
									option.data.displayName,
									option.data.photoURL
								)
							}>
							<Avatar
								src={option.data.photoURL}
								alt={option.data.displayName}
								id={option.id}
							/>
							<div className="username" id={option.id}>
								<p>{option.data.displayName}</p>
							</div>
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
			{receiverChosen ? (
				<Chip
					avatar={<Avatar src={receiver.photoURL} />}
					label={receiver.displayName}
					onDelete={clearData}
				/>
			) : null}
			{optionList}
		</div>
	);
}

AutocompleteUsers.propTypes = {
	id: PropTypes.string,
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	options: PropTypes.array,
	placeholder: PropTypes.string,
	setId: PropTypes.func,
	showOptions: PropTypes.bool,
	toggleOptions: PropTypes.func,
	receiver: PropTypes.object,
	receiverChosen: PropTypes.bool,
	clearData: PropTypes.func,
	allUsers: PropTypes.bool,
};

export default AutocompleteUsers;
