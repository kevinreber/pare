import React from 'react';
import TutorCard from './TutorCard';

const tutorsDemo = [
	{
		id: 1,
		name: 'John',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Computer Science',
		classes: 'Math1A, CS61A, CS61B',
	},
	{
		id: 2,
		name: 'Angela',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Computer Science',
		classes: 'Math1A, CS61A, CS61B',
	},
	{
		id: 3,
		name: 'Tony',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Math',
		classes: 'Math1A, CS61A, CS61B',
	},
];

function TutorList({ tutors = tutorsDemo }) {
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

	return <div>{List}</div>;
}

export default TutorList;
