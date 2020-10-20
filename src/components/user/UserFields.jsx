/** Dependencies */
import React from 'react';
import moment from 'moment';

/** Re-usable Field for User Body */
function UserFields({ label, content = '-' }) {
	const formatArray = (arr) => arr.join(', ');
	const formatAvailability = (data) => {
		return (
			<table>
				<tbody>{availability(data)}</tbody>
			</table>
		);
	};

	// format handler for availability
	const availability = (data) => 
		(data.map((day) => 
			(
				<>
					<tr key={day.data.day}>
							<th>{day.id.charAt(0).toUpperCase() + day.id.slice(1)}:</th>
							{buildValues(day.data['0'].start, day.data['0'].end)}
					</tr>
				</>
			)
		));

	// convert to local time if not null
	const buildValues = (start, end) => {
		let startDate = null;
		let endDate = null;
		if	(start !== null && end !== null){
			startDate = start.toDate();
			endDate = end.toDate();
		}
		let list =
			!startDate || !endDate ? (<td>-</td>) : (
				<>
					<td>
						{moment(startDate).format('LT')} - {moment(endDate).format('LT')}
					</td>
				</>
			);
		return list;
	};
 
	let inputField;

	switch (typeof content) {
		case 'object':
			if (label === 'Availability'){
				inputField = formatAvailability(content);
			}
			else if (Array.isArray(content)) {
				inputField = formatArray(content);
			} else {
				inputField = formatAvailability(content);
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
