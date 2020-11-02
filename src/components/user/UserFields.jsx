/** Dependencies */
import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';

/** Helpers */
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

/** Builds an input field of User Field data.
 * UserProfile -> UserProfileBody => UserFields
 *
 * @param {string}	label		Label of input.
 * @param {string}	content		String of content for input.
 * @param {array}	content		If type of content is an array, array of content for input.
 */
function UserFields({ label, content = '-' }) {
	const formatArray = (arr) => arr.join(', ');

	// format handler for availability
	const formatAvailability = (data) => {
		return (
			<ul className="User-Availability-List">
				{data.map((day) => (
					<li key={day.id}>
						<p className="Available-Day">{capitalizeFirstLetter(day.id)}:</p>
						<div className="Available-Time">
							{buildValues(day.data['0'].start, day.data['0'].end)}
						</div>
					</li>
				))}
			</ul>
		);
	};

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

	// Format Courses
	const formatCourses = (courses) => {
		const list = (
			<ul className="User-Course-List">
				{courses.length > 0 ? (
					<>
						{courses.map((course) => {
							const title = `${course.data.course.abbreviation} ${course.data.course.course_number}`;
							return <li key={course.id}>{title}</li>;
						})}
					</>
				) : (
					<li>-</li>
				)}
			</ul>
		);

		return list;
	};

	let inputField;

	if (label === 'Availability') {
		inputField = formatAvailability(content);
	} else if (label === 'Classes Taken') {
		inputField = formatCourses(content);
	} else if (Array.isArray(content)) {
		inputField = formatArray(content);
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
