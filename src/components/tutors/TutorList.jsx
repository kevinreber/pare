/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

function TutorList({ tutors = [] }) {
	const List = tutors.map((tutor) => (
		<>
			<Link to={`/users/${tutor.id}`}>
				<div key={tutor.id} className="mate-table table-hover">
					<div className="Tutor Tutor-Card">
						<div className="mr-3">
							<img
								src={tutor.data.photoURL}
								alt={tutor.data.displayName}
								className="Tutor Tutor-Avatar Avatar"
							/>
						</div>
						<div className="mate-text-primary text-left mr-auto">
							{tutor.data.displayName} <br />
							<span className="mate-text-secondary Tutor-Card-Term">
								{/* {tutor.classes} */}
							</span>
						</div>
						<div className="Tutor-Title mate-text-secondary text-left">
							{/* {tutor.tutorSubjects} */}
						</div>
					</div>
				</div>
			</Link>
		</>
	));

	return <>{List}</>;
}

export default TutorList;
