import React from 'react';

/** Displays Course Information such ass assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo({ course }) {
	return (
		<>
			<h1>{course}</h1>
		</>
	);
}

export default CourseInfo;
