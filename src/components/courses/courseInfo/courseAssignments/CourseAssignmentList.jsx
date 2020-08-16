import React from 'react';
import CourseAssignment from './CourseAssignment';
import NoData from '../../../general/NoData';

/** Displays List of Assignments
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
function CourseAssignmentList({ assignments }) {
	// build list of courses, if no courses exist return 'No courses added'
	const AssignmentList =
		assignments && assignments.length !== 0 ? (
			assignments.map((assignment) => (
				<CourseAssignment
					key={assignment.id}
					id={assignment.id}
					title={assignment.title}
					dueDate={assignment.dueDate}
					classGrade={assignment.classGrade}
					userGrade={assignment.userGrade}
					submitStatus={assignment.submitStatus}
					classSubmittals={assignment.classSubmittals}
				/>
			))
		) : (
			<NoData text={'assignments'} />
		);

	return <>{AssignmentList}</>;
}

export default CourseAssignmentList;
