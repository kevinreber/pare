import React from 'react';
import CourseCard from './CourseCard';

/** Creates a List of User's Courses
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseList({ courses = [] }) {
	const List = courses.map((course) => (
		<CourseCard
			id={course.id}
			key={course.id}
			department={course.data.course.abbreviation}
			number={course.data.course.course_number}
			// term={course.data.course}
			// name={course.data.course}
		/>
	));

	return <div className='Course-List'>{List}</div>;
}

export default CourseList;
