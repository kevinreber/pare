import React from 'react';

/** Displays Course Overall Grades
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseOverallGrades
 */
function CourseOverallGrades({ course }) {
	return (
		<>
			<h5 className='OverallGrading mate-text-secondary'>
				Estimated Score: C- 72%
			</h5>
		</>
	);
}

export default CourseOverallGrades;
