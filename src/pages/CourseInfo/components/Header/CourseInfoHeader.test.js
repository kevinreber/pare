import React from 'react';
import { render } from '@testing-library/react';
import CourseInfoHeader from './CourseInfoHeader';

describe('CourseInfoHeader Component', () => {
	const mockCourse = {
		ongoing_sections: [{ instructor: 'Lisa Iwamoto', word_days: 'MWF' }],
		course: {
			enrolled: 100,
		},
	};

	const mockRemove = () => console.log('removing...');

	test('should render without crashing', () => {
		render(
			<CourseInfoHeader
				course={mockCourse}
				semester={'FALL 2020'}
				title={'ARCH 100A'}
				removeCourse={mockRemove}
			/>
		);
	});
});
