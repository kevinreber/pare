/** Dependencies */
import React from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';

/** Helpers */
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

/** MUI */
import Chip from '@material-ui/core/Chip';

/** Builds an input field of User Field data.
 * UserProfile -> UserProfileBody => UserFields
 *
 * @param {string}	label		Label of input.
 * @param {string}	content		String of content for input.
 * @param {array}	content		If type of content is an array, array of content for input.
 * @param {boolean} chips		Displays content as chips or text.
 * @param {string}	field		Field name.
 */
function UserFields({ label, content = '-', chips = false, field = '' }) {
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

	// Build list of elements for User Keywords and User Portfolio Links
	const fieldList = (field, arrayOfData) => {
		let list;

		// Format Courses
		if (field === 'Classes Taken') {
			list = arrayOfData.map((course, index) => {
				const title = `${course.data.course.abbreviation} ${course.data.course.course_number}`;
				return (
					<>
						<li data-name={course.id} key={course.id}>
							<Chip label={title} size={'small'} />
						</li>
					</>
				);
			});
		} else {
			list = arrayOfData.map((data, index) => (
				<li data-name={field} key={index}>
					<Chip label={data} size={'small'} />
				</li>
			));
		}

		return list;
	};

	let inputField;

	if (chips) {
		inputField = <ul className={field}>{fieldList(label, content)}</ul>;
	} else if (label === 'Availability') {
		inputField = formatAvailability(content);
	} else if (label === 'About') {
		inputField = <p>{content}</p>;
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
	chips: PropTypes.bool,
	field: PropTypes.string,
};

export default UserFields;
