import React from 'react';
import { render } from '@testing-library/react';
import CourseCard from './CourseCard';

/** React Router */
import { BrowserRouter } from 'react-router-dom';

describe('CourseCard Component', () => {
	test('should render without crashing', () => {
		render(
			<BrowserRouter>
				<CourseCard
					id={355}
					department={'ARCH'}
					number={100}
					term={'FALL 2020'}
					title={'Fundamentals of Architectural Design'}
				/>
			</BrowserRouter>
		);
	});
});
