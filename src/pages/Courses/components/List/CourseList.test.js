import React from 'react';
import { render } from '@testing-library/react';
import CourseList from './CourseList';

/** React Router */
import { BrowserRouter } from 'react-router-dom';

describe('CourseList Component', () => {
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
	test('should render without crashing', () => {
		render(
			<BrowserRouter>
				<CourseList courses={mockCourses} />
			</BrowserRouter>
		);
	});
});
