/** Dependencies */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import TutorList from '../TutorList/TutorList';
import CTAButton from '../../../../components/CTAButton/CTAButton';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

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
 * @param {array}    tutors				Array of objects containing tutor data.
 * @param {boolean}  isLoading    		Status if data is loaded.
 * @param {function} setLoadTutorData 	Function that set's state to load updated Tutor data.
 */
function FindTutors({ tutors, isLoading, setLoadTutorData }) {
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
	const [usedSearch, setUsedSearch] = useState(false);

	const handleChange = (e) => {
		const { name } = e.target;
		setAvailability((fData) => ({ ...fData, [name]: !availability[name] }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let filteredTutorKeywords = tutors;

		// if user is using search bar
		if (search !== '' && search.trim() !== '') {
			filteredTutorKeywords = tutors.filter((tutor) => {
				// check if tutors keywords include user's search
				let result = tutor.data.keywords.some((keyword) =>
					search.toLowerCase().includes(keyword.toLowerCase())
				);
				if (result) {
					return tutor;
				}
			});
		}

		const filteredTutorAvailability = [];

		// filter tutors by availability
		for (let tutor of filteredTutorKeywords) {
			for (let day of tutor.availability) {
				// if user has checked availability of day and tutor is available on that specified day
				if (availability[day.id] && day.data['0'].start && day.data['0'].end) {
					filteredTutorAvailability.push(tutor);
				}
			}
		}

		const filtered =
			filteredTutorAvailability.length !== 0
				? filteredTutorAvailability
				: filteredTutorKeywords;
		setFilteredTutors(filtered);
		setLoadTutorData();
		setUsedSearch(true);
	};

	const resetSearch = () => {
		setFilteredTutors([]);
		setAvailability(AVAILABILITY_INITIAL_STATE);
		setSearch('');
		setUsedSearch(false);
	};

	return (
		<div className="Find-Tutors">
			{!usedSearch ? (
				<form className="Find-Tutors__Form" onSubmit={handleSubmit}>
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
			) : (
				<>
					<TutorList tutors={filteredTutors} isLoading={isLoading} />
					<div onClick={resetSearch}>
						<CTAButton text="New Search" />
					</div>
				</>
			)}
		</div>
	);
}

FindTutors.propTypes = {
	tutors: PropTypes.array,
	isLoading: PropTypes.bool,
	setLoadTutorData: PropTypes.func,
};

export default FindTutors;
