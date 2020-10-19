/** Dependencies */
import React from 'react';

/** Re-usable Field for User Body */
function UserFields({ label, content = '-' }) {
	const formatArray = (arr) => arr.join(', ');
	const formatObject = (obj) => {
		return (
			<table>
				<tbody>{availability(obj)}</tbody>
			</table>
		);
	};

	// format handler for availability
	const availability = (obj) => {
		let rows = !obj ? (
			'-'
		) : (
			<>{Object.keys(obj).map((key, index) => tableRows(key, obj[key], index))}</>
		);

		return rows;
	};

	const tableRows = (key, arr, idx) => {
		return (
			<>
				<tr key={idx}>
					<th>{key.charAt(0).toUpperCase() + key.slice(1)}:</th>
					{buildValues(arr)}
				</tr>
			</>
		);
	};

	const buildValues = (arr) => {
		let list =
			!arr || arr.length === 0 ? (
				<td>-</td>
			) : (
				<>
					{arr.map((date) => (
						<td>
							{date.start} - {date.end}
						</td>
					))}
				</>
			);
		return list;
	};

	let inputField;

	switch (typeof content) {
		case 'object':
			if (Array.isArray(content)) {
				inputField = formatArray(content);
			} else {
				inputField = formatObject(content);
			}
			break;
		default:
			inputField = content;
	}

	return (
		<div className='UserProfile__Body-Field'>
			<p className='UserProfile__Body-Label mate-text-primary'>{label}</p>
			<p className='UserProfile__Body-Input'>{inputField}</p>
		</div>
	);
}

export default UserFields;
