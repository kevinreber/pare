import React, { useState } from 'react';
import AssignmentStatusIcon from './AssignmentStatusIcon';
import EnterGradeBtn from './EnterGradeBtn';
import EditGradeForm from './EditGradeForm';
import Modal from '../../general/Modal';

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
	const [isEditing, setIsEditing] = useState(false);

	const editToggle = () => setIsEditing((edit) => !edit);

	/** assignmentStatus will display 'danger' or success if depending if assignment
	 * was submitted before assignment.dueDate
	 */
	const assignmentStatus = submitStatus ? 'success' : 'danger';

	const saveGrade = (data) => {
		console.log(data);
		setIsEditing(false);
	};

	/** Shows user's grade and button to edit grade */
	const displayGrade = userGrade ? (
		<>
			Your Grade: {userGrade}%
			<div onClick={editToggle} className='Change-Grade'>
				<i className='fas fa-edit'></i>
			</div>
		</>
	) : (
		<EnterGradeBtn enterGrade={editToggle} />
	);

	return (
		<>
			{isEditing ? (
				<Modal
					closeModal={editToggle}
					content={
						<EditGradeForm
							assignmentName={title}
							userGrade={userGrade}
							save={saveGrade}
						/>
					}
				/>
			) : (
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
								{displayGrade}
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</>
	);
}

export default CourseAssignment;
