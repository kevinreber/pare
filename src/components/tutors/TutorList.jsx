/** Dependencies */
import React from 'react';

/** Components & Helpers */
import TutorCard from './TutorCard';

function TutorList({ tutors = [] }) {
	const List = tutors.map((tutor) => (
		<TutorCard
			id={tutor.id}
			key={tutor.id}
			name={tutor.name}
			avatar={tutor.avatar}
			tutorSubjects={tutor.tutorSubjects}
			classes={tutor.classes}
		/>
	));

	return <>{List}</>;
}

export default TutorList;
