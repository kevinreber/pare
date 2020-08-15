import React from 'react';
import Course from './Course';

/** Creates a List of User's Courses
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseList({ courses = [] }) {
	const List = courses.map((course) => <Course course={course} />);

	return <div className='Course-List'>{List}</div>;
}

export default CourseList;
