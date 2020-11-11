/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import Loader from '../../../../components/layout/Loader/Loader';
import NoData from '../../../../components/NoData/NoData';

/** MUI */
import Chip from '@material-ui/core/Chip';

/**
 * Form to fill out user's tutor info and availability.
 *
 * @param {array}    tutors			Array of objects containing tutor data.
 * @param {boolean}  isLoading    	Status if data is loaded.
 */
function TutorList({ tutors, isLoading }) {
	// Build list of elements for User Keywords and User Classes
	const fieldList = (field, arrayOfData) => {
		return arrayOfData.map((data, index) => (
			<li data-name={field} key={index}>
				<Chip label={data} size="small" />
			</li>
		));
	};

	// Build list of tutors
	const List = tutors.map((tutor) => (
		<li key={tutor.id} className="mate-table table-hover">
			<Link to={`/users/${tutor.id}`}>
				<div className="Tutor Tutor-Card">
					<div className="mr-3">
						<img
							src={tutor.data.photoURL}
							alt={tutor.data.displayName}
							className="Tutor Tutor-Avatar Avatar"
						/>
					</div>
					<div className="Tutor-Card-Content mate-text-primary text-left mr-auto">
						<div className="Tutor-Card__Header">
							{tutor.data.displayName} <br />
						</div>
						<div className="Tutor-Card__Body">
							<div className="Tutor-Card__Classes">
								{tutor.data.classes.length > 0 ? (
									<>
										<p>Classes Taken: </p>
										<ul className="User-Classes">
											{fieldList('classes', tutor.data.classes)}
										</ul>
									</>
								) : null}
							</div>
							<div className="Tutor-Card__Keywords">
								{tutor.data.keywords.length > 0 ? (
									<>
										<p>I can help in: </p>
										<ul className="User-Keywords">
											{fieldList('keywords', tutor.data.keywords)}
										</ul>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</li>
	));

	return (
		<>
			{isLoading ? <Loader /> : null}
			{tutors.length === 0 ? (
				<NoData text="tutors available" added={false} />
			) : (
				<ul className="Tutor-List">{List}</ul>
			)}
		</>
	);
}

TutorList.propTypes = {
	tutors: PropTypes.array,
	isLoading: PropTypes.bool,
};

export default TutorList;
