import React, { useState } from 'react';
import CourseAssignment from './CourseAssignment';
import AssignmentForm from './AssignmentForm';
import Modal from '../../../general/Modal';
import NoData from '../../../general/NoData';
// import { useSelector, useDispatch } from 'react-redux';

/** Displays List of Assignments
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoBody -> CourseAssignmentList -> CourseAssignment
 */
function CourseAssignmentList({ assignments }) {
	// build list of courses, if no courses exist return 'No courses added'
	const AssignmentList =
		assignments && assignments.length !== 0 ? (
			assignments.map((assignment) => (
				<CourseAssignment assignment={assignment} />
			))
		) : (
			<NoData text={'assignments'} />
		);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addAssignment = (assignmentData) => {
		console.log(assignmentData);
		setShowForm(false);
	};

	if (showForm) {
		return (
			<Modal
				content={<AssignmentForm save={addAssignment} />}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<>
			{AssignmentList}
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					+ Add Assignment
				</p>
			</div>
		</>
	);
}

export default CourseAssignmentList;
