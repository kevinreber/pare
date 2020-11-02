/** Dependencies */
import React from 'react';

/** Components & Helpers */
import CourseAssignmentCard from './CourseAssignmentCard';
import NoData from '../../general/NoData';

/** Displays List of Assignments
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignmentCard
 */
function CourseAssignmentList({ assignments }) {
	// build list of courses, if no courses exist return 'No courses added'
	const AssignmentList =
		assignments && assignments.length !== 0 ? (
			assignments.map((assignment) => (
				<li
					key={assignment.id}
					id={assignment.id}
					className="Assignment Assignment-Card mate-table table-hover">
					<CourseAssignmentCard
						id={assignment.id}
						title={assignment.data.title}
						dueDate={assignment.data.dueDate}
						grades={assignment.data.grades}
					/>
				</li>
			))
		) : (
			<NoData text={'Assignments'} />
		);

	return (
		<>
			{/* <div className="Courses-Header pt-2 pb-1"></div> */}
			<ul className="Course-Info-Body-List">{AssignmentList}</ul>
		</>
	);
}

export default CourseAssignmentList;
