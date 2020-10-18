/** Dependencies */
import React from 'react';

/** Components & Helpers */
import CourseCard from './CourseCard';

/** Creates a List of User's Courses
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseList({ courses = [] }) {
	const List = courses.map((course) => (
		<CourseCard
			id={course.id}
			department={course.data.course.abbreviation}
			number={course.data.course.course_number}
			term={course.data.semester}
			title={course.data.course.title}
		/>
	));

	return <div className='Course-List'>{List}</div>;
}

export default CourseList;
