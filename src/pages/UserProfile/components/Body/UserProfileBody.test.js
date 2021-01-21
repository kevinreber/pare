import React from 'react';
import { render } from '@testing-library/react';
import UserProfileBody from './UserProfileBody';

describe('UserProfileBody Component', () => {
	const mockCourses = [
		{
			id: 355,
			data: {
				course: {
					abbreviation: 'ARCH',
					course_number: 100,
					title: 'Fundamentals of Architectural Design',
				},
				semester: 'FALL 2020',
			},
		},
		{
			id: 17721,
			data: {
				course: {
					abbreviation: 'COMPSCI',
					course_number: '61B',
					title: 'Machine Structures',
				},
				semester: 'FALL 2020',
			},
		},
	];
	const mockDelete = () => console.log('deleting...');

	test('should render without crashing', () => {
		render(
			<UserProfileBody
				bio={'Hello World!'}
				classes={mockCourses}
				isTutor={false}
				deleteAccount={mockDelete}
			/>
		);
	});
});
