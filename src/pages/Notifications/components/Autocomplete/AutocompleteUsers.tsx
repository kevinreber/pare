/** Dependencies */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import * as PropTypes from 'prop-types';

/** Components & Helpers */
import db from '../../../../config/fbConfig';
import { AutoCompleteUsersProps } from '../../interface';

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
 * @param 	{string} 	placeholder 	Placeholder text for input element.
 * @param 	{function} 	setId 			Function to store state of receiving user's Id.
 * @param 	{boolean} 	showOptions 	Boolean to show autocomplete list of optional users.
 * @param 	{function} 	toggleOption 	Toggles showOptions.
 * @param	{object}	receiver		Receiving user data.
 * @param 	{boolean}	receiverChosen	Boolean if receiving user has been chosen.
 * @param	{function}	clearData		Clears state of receiving user.
 * @param 	{boolean}	allUsers		Boolean to show all users or filter users to be displayed.
 */
const AutocompleteUsers = ({
	id,
	onChange,
	name,
	value,
	placeholder,
	setId,
	showOptions,
	toggleOptions,
	receiver,
	receiverChosen,
	clearData,
	allUsers = false,
}: AutoCompleteUsersProps): JSX.Element => {
	// @ts-ignore
	const currentUser = useSelector((state) => state.auth.user);

	const [users, setUsers] = useState([]);
	const [messagedUsers, setMessagedUsers] = useState<any[]>([]);
	const [usersList, setUsersList] = useState([]);
	const [filteredOptions, setFilteredOptions] = useState([]);

	/** Get Users */
	useEffect(() => {
		db.collection('users').onSnapshot((snapshot: any) =>
			setUsers(
				snapshot.docs.map((doc: any) => ({
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
				.then((snapshot: any) => {
					setMessagedUsers(snapshot.docs.map((doc: any) => doc.data()));
				});
		}
	}, [users, currentUser, allUsers]);

	/** Filter Users to avoid duplicate messages */
	useEffect(() => {
		if (messagedUsers && !allUsers) {
			// Set to avoid any userId repeats
			const set = new Set();

			for (let user of messagedUsers) {
				user.users.map((uid: string) => set.add(uid));
			}

			let options = users.filter((user: { id: string }) => !set.has(user.id));
			setUsersList(options);
		} else if (allUsers) setUsersList(users);
	}, [messagedUsers, users, allUsers]);

	/** Commit onChange changes and filter through options */
	function onSearch(e: ChangeEvent<HTMLInputElement>) {
		onChange(e, null);
		toggleOptions(true);
		let opts = usersList.filter(
			(user: any) =>
				user.data.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1
		);

		setFilteredOptions(opts);
	}

	function handleClick(id: string, displayName: string, photoURL: string) {
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
				{filteredOptions.map(
					(option: {
						id: string;
						data: { displayName: string; photoURL: string };
					}) => {
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
					}
				)}
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
					// @ts-ignore
					onDelete={clearData}
				/>
			) : null}
			{optionList}
		</div>
	);
};

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
