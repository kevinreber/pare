import React from 'react';
import CourseCard from './CourseCard';

/** Creates a List of User's Courses
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseList({ courses = [] }) {
	const List = courses.map((course) => <CourseCard course={course} />);

	return <div className='Course-List'>{List}</div>;
}

export default CourseList;
