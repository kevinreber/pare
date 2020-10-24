/** Dependencies */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import TutorList from './TutorList';
import CTAButton from '../general/CTAButton';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

/** MUI */
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SearchIcon from '@material-ui/icons/Search';

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
	const [search, setSearch] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, e.target, value);
		setAvailability((fData) => ({ ...fData, [name]: !availability[name] }));
	};

	return (
		<div className="Find-Tutors">
			<form>
				<div className="form-group">
					<label htmlFor="tutor-search">I need help in...</label>
					<div className="Search__Elements">
						<div className="Search__Icon">
							<SearchIcon />
						</div>
						<input
							id="tutor-search"
							className="form-control mate-form-input"
							type="search"
							onChange={(e) => setSearch(e.target.value)}
							name="search"
							value={search}
							maxLength="30"
							placeholder="eg. photoshop, python, math"
						/>
					</div>
				</div>
				<div className="form-group Find-Availability">
					<label>Availability</label>
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
				</div>
				<CTAButton text="Search" />
			</form>
			<TutorList tutors={filteredTutors} isLoading={isLoading} />
		</div>
	);
}

FindTutors.propTypes = {
	tutors: PropTypes.array,
	isLoading: PropTypes.bool,
};

export default FindTutors;
