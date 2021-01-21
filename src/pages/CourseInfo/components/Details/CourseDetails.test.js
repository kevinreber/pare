import React from 'react';
import { render } from '@testing-library/react';
import CourseDetails from './CourseDetails';

describe('CourseDetails Component', () => {
	const mockCourse = {
		ongoing_sections: [{ instructor: 'Lisa Iwamoto', word_days: 'MWF' }],
		course: {
			enrolled: 100,
		},
	};

	const mockRemove = () => console.log('removing...');

	test('should render without crashing', () => {
		render(
			<CourseDetails
				course={mockCourse}
				title={'ARCH 100A'}
				show={true}
				toggle={null}
				removeCourse={mockRemove}
			/>
		);
	});
});
