import React from 'react';
import CourseAssignmentList from './CourseAssignments/CourseAssignmentList';

/** Displays Body information of Course Info Page
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
function CourseInfoHeader({ assignments = [] }) {
	return (
		<>
			<div className='Courses-Header pt-2 pb-1'></div>
			<div className='Course-Info-Body-List'>
				<CourseAssignmentList assignments={assignments} />
			</div>
		</>
	);
}

export default CourseInfoHeader;
