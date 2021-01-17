/** Dependencies */
import React, { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

/** Components & Helpers */
import AssignmentStatusIcon from './AssignmentStatusIcon';
import EnterGradeBtn from './EnterGradeBtn';
import EditGradeForm from './EditGradeForm';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { showModalContent } from '../../store/actions/modal';
import db from '../../config/fbConfig';

/** Interfaces */
import { AssignmentCardProps } from './interface';

/** Displays Assignment Data
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
const CourseAssignment = ({
	id,
	title,
	dueDate,
	grades,
}: AssignmentCardProps): JSX.Element => {
	// @ts-ignore
	const { courseId } = useParams();
	const dispatch = useDispatch();
	// @ts-ignore
	const currentUser = useSelector((state) => state.auth.user);
	const userGrade: any = grades[currentUser.uid];
	const [isEditing, setIsEditing] = useState(false);

	const editToggle = () => setIsEditing((edit) => !edit);

	/** assignmentStatus will display 'danger' or success if depending if assignment
	 * was submitted before assignment.dueDate
	 */
	const assignmentStatus = userGrade ? 'success' : 'danger';

	// @ts-ignore
	const saveGrade = (data) => {
		/** update DB and make change */
		db.collection('courses')
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

		/** Close Grade Modal */
		dispatch(
			showModalContent({
				isOpen: false,
				content: null,
			})
		);

		setIsEditing(false);
	};

	/** Shows user's grade and button to edit grade */
	const displayGrade = userGrade ? (
		<div className="mate-text-secondary Assignment-Grade text-right pr-1">
			<p>Your Grade: {userGrade}%</p>
			<div onClick={editToggle} className="Change-Grade">
				<i className="fas fa-edit"></i>
			</div>
		</div>
	) : (
		// @ts-ignore
		<EnterGradeBtn enterGrade={() => editToggle()} />
	);

	// if editing grade, show Edit Grade Form for user to input grade
	if (isEditing) {
		dispatch(
			showModalContent({
				isOpen: true,
				content: (
					<EditGradeForm
						assignmentName={title}
						userGrade={userGrade}
						save={saveGrade}
					/>
				),
			})
		);
	}

	return (
		<>
			<AssignmentStatusIcon color={assignmentStatus} />
			<div className="Assignment-Info">
				<h5 className="mate-text-primary Assignment-Title text-left">
					{title}
				</h5>
				<p className="mate-text-secondary Assignment-Due font-italic text-left">
					{/* @ts-ignore  */}
					Due: {moment(dueDate.toDate()).startOf('day').fromNow()}
				</p>
			</div>
			{displayGrade}
		</>
	);
};

export default memo(CourseAssignment);
