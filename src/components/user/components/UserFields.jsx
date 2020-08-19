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

	const availability = (obj) => {
		let rows = !obj ? (
			'-'
		) : (
			<>{Object.keys(obj).map((key) => tableRows(key, obj[key]))}</>
		);

		return rows;
	};

	const tableRows = (key, arr) => {
		return (
			<>
				<tr>
					<th>{key}:</th>
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
		<div className='User-Profile-Body-Field'>
			<p className='User-Profile-Body-Label mate-text-primary'>{label}</p>
			<p className='User-Profile-Body-Input'>{inputField}</p>
		</div>
	);
}

export default UserFields;
