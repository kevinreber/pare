import React from 'react';
import AssignmentStatusIcon from './AssignmentStatusIcon';
import UserGrade from './UserGrade';
import EnterGradeBtn from './EnterGradeBtn';

/** Displays Assignment Data
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
function CourseAssignment({
	key,
	id,
	title,
	dueDate,
	classGrade,
	userGrade,
	submitStatus,
	classSubmittals,
}) {
	/** assignmentStatus will display 'danger' or success if depending if assignment
	 * was submitted before assignment.dueDate
	 */
	const assignmentStatus = submitStatus ? 'success' : 'danger';

	return (
		<>
			<table
				key={key}
				id={id}
				className='Assignment Assignment-Card mate-table table-hover'>
				<AssignmentStatusIcon color={assignmentStatus} />
				<tbody>
					<tr>
						<td className='mate-text-primary Assignment-Title text-left'>
							{title}
						</td>
						<td className='mate-text-secondary Assignment-Grade text-right pr-1'>
							Class Grade: {classGrade}%
						</td>
					</tr>
					<tr>
						<td className='mate-text-secondary Assignment-Due font-italic text-left'>
							Due: {dueDate}
						</td>
						<td className='mate-text-secondary Assignment-Grade text-right pr-1'>
							{userGrade ? <UserGrade grade={userGrade} /> : <EnterGradeBtn />}
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default CourseAssignment;
