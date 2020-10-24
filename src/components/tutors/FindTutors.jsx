/** Dependencies */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import TutorList from './TutorList';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

/** MUI */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/** Days of the week */
const DAYS = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
];

/**
 * Search bar that filters tutors.
 *
 * @param {array}    tutors			Array of objects containing tutor data.
 * @param {boolean}  isLoading    	Status if data is loaded.
 */
function FindTutors({ tutors, isLoading }) {
	const AVAILABILITY_INITIAL_STATE = {
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
		sunday: false,
	};

	const [filteredTutors, setFilteredTutors] = useState([]);
	const [availability, setAvailability] = useState(AVAILABILITY_INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, e.target, value);
		setAvailability((fData) => ({ ...fData, [name]: !availability[name] }));
	};

	return (
		<>
			<input type="text" />
			{DAYS.map((day, index) => (
				<FormControlLabel
					key={index + 1}
					control={
						<Checkbox
							checked={availability[day]}
							onChange={handleChange}
							name={day}
						/>
					}
					label={capitalizeFirstLetter(day)}
				/>
			))}
			<TutorList tutors={filteredTutors} isLoading={isLoading} />
		</>
	);
}

FindTutors.propTypes = {
	tutors: PropTypes.array,
	isLoading: PropTypes.bool,
};

export default FindTutors;
