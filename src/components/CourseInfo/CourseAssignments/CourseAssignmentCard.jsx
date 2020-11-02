/** Dependencies */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

/** Components & Helpers */
import AssignmentStatusIcon from './AssignmentStatusIcon';
import EnterGradeBtn from './EnterGradeBtn';
import EditGradeForm from './EditGradeForm';
import Modal from '../../general/Modal';
import { addFlashMessage } from '../../../store/actions/flashMessages';
import db from '../../../config/fbConfig';

/** Displays Assignment Data
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
function CourseAssignment({ id, title, dueDate, grades, classSubmittals }) {
	const { courseId } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const userGrade = grades[currentUser.uid];
	const [isEditing, setIsEditing] = useState(false);

	const editToggle = () => setIsEditing((edit) => !edit);

	/** assignmentStatus will display 'danger' or success if depending if assignment
	 * was submitted before assignment.dueDate
	 */
	const assignmentStatus = userGrade ? 'success' : 'danger';

	const saveGrade = (data) => {
		/** update DB and make change */
		db.collection('class')
			.doc(courseId)
			.collection('assignments')
			.doc(id)
			.update({
				grades: {
					[currentUser.uid]: data,
				},
			});

		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Grade Saved!',
				type: 'success',
			})
		);
		setIsEditing(false);
	};

	/** Shows user's grade and button to edit grade */
	const displayGrade = userGrade ? (
		<div div className="mate-text-secondary Assignment-Grade text-right pr-1">
			<p>Your Grade: {userGrade}%</p>
			<div onClick={editToggle} className="Change-Grade">
				<i className="fas fa-edit"></i>
			</div>
		</div>
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
				<>
					<AssignmentStatusIcon color={assignmentStatus} />
					<div>
						<h5 className="mate-text-primary Assignment-Title text-left">
							{title}
						</h5>
						<p className="mate-text-secondary Assignment-Due font-italic text-left">
							Due: {moment(dueDate.toDate()).startOf('day').fromNow()}
						</p>
					</div>
					{displayGrade}
				</>
			)}
		</>
	);
}

export default CourseAssignment;

// {/* <>
// 	<AssignmentStatusIcon color={assignmentStatus} />
// 	{/* <tbody> */}
// 	<div>
// 		<h5 className="mate-text-primary Assignment-Title text-left">
// 			{title}
// 		</h5>
// 		{/* <td className='mate-text-secondary Assignment-Grade text-right pr-1'>
// 					Class Grade: {classGrade}%
// 				</td> */}
// 	</div>
// 	<div>
// 		<p className="mate-text-secondary Assignment-Due font-italic text-left">
// 			Due: {moment(dueDate.toDate()).startOf('day').fromNow()}
// 		</p>
// 		{/* <div className="mate-text-secondary Assignment-Grade text-right pr-1"> */}
// 		{displayGrade}
// 		{/* </div> */}
// 	</div>
// 	{/* </tbody> */}
// </>; */}

// {/* <table
// 	id={id}
// 	className="Assignment Assignment-Card mate-table table-hover">
// 	<AssignmentStatusIcon color={assignmentStatus} />
// 	<tbody>
// 		<tr>
// 			<th
// 				colspan="2"
// 				className="mate-text-primary Assignment-Title text-left">
// 				{title}
// 			</th>
// 			{/* <td className='mate-text-secondary Assignment-Grade text-right pr-1'>
// 				Class Grade: {classGrade}%
// 			</td> */}
// 		</tr>
// 		<tr>
// 			<td className="mate-text-secondary Assignment-Due font-italic text-left">
// 				Due: {moment(dueDate.toDate()).startOf('day').fromNow()}
// 	</td>
// 			<td className="mate-text-secondary Assignment-Grade text-right pr-1">
// 				{displayGrade}
// 			</td>
// 		</tr>
// 	</tbody>
// </table> */}
