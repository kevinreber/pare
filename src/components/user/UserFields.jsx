/** Dependencies */
import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';

/** Builds an input field of User Field data.
 * UserProfile -> UserProfileBody => UserFields
 *
 * @param {string}	label		Label of input.
 * @param {string}	content		String of content for input.
 * @param {array}	content		If type of content is an array, array of content for input.
 */
function UserFields({ label, content = '-' }) {
	const formatArray = (arr) => arr.join(', ');
	const formatAvailability = (data) => {
		return <ul className="User-Availability-List">{availability(data)}</ul>;
	};

	// format handler for availability
	const availability = (data) =>
		data.map((day) => (
			<li key={day.data.day}>
				<p className="Available-Day">
					{day.id.charAt(0).toUpperCase() + day.id.slice(1)}:
				</p>
				<div className="Available-Time">
					{buildValues(day.data['0'].start, day.data['0'].end)}
				</div>
			</li>
		));

	// convert to local time if not null
	const buildValues = (start, end) => {
		let startDate = null;
		let endDate = null;
		if (start !== null && end !== null) {
			startDate = start.toDate();
			endDate = end.toDate();
		}
		let list =
			!startDate || !endDate ? (
				<p className="empty">-</p>
			) : (
				<>
					<p>
						{moment(startDate).format('LT')} - {moment(endDate).format('LT')}
					</p>
				</>
			);
		return list;
	};

	let inputField;

	switch (typeof content) {
		case 'object':
			if (label === 'Availability') {
				inputField = formatAvailability(content);
			} else if (Array.isArray(content)) {
				inputField = formatArray(content);
			} else {
				inputField = formatAvailability(content);
			}
			break;
		default:
			inputField = content;
	}

	return (
		<div className="UserProfile__Body-Field">
			<p className="UserProfile__Body-Label mate-text-primary">{label}</p>
			<div className="UserProfile__Body-Input">{inputField}</div>
		</div>
	);
}

UserFields.propTypes = {
	label: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default UserFields;
