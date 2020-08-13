import React from 'react';
import AssignmentStatusIcon from './AssignmentStatusIcon';
import UserGrade from './UserGrade';
import EnterGradeBtn from './EnterGradeBtn';

/** Displays Assignment Data */
function CourseAssignment({ assignment }) {
	/** assignmentStatus will display 'danger' or success if depending if assignment
	 * was submitted before assignment.dueDate
	 */
	const assignmentStatus = 'success';

	return (
		<>
			<table
				id={assignment.id}
				className='Assignment Assignment-Card mate-table table-hover'>
				<AssignmentStatusIcon color={assignmentStatus} />
				<tbody>
					<tr className=''>
						<td className='mate-text-primary Assignment-Title text-left'>
							{assignment.title}
						</td>
						<td className='mate-text-secondary Assignment-Grade text-right pr-1'>
							Class Grade: {assignment.classGrade}%
						</td>
					</tr>
					<tr className=''>
						<td className='mate-text-secondary Assignment-Due font-italic text-left'>
							Due: {assignment.dueDate}
						</td>
						<td className='mate-text-secondary Assignment-Grade text-right pr-1'>
							{assignment.userGrade ? (
								<UserGrade grade={assignment.userGrade} />
							) : (
								<EnterGradeBtn />
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default CourseAssignment;
