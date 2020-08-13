import React, { useState } from 'react';
import CourseAssignment from './CourseAssignment';
import AssignmentForm from './AssignmentForm';
import Modal from '../../../general/Modal';
import { assignmentList } from '../../../temp/data';

/** Displays List of Assignments */
function CourseAssignmentList({ assignments = [] }) {
	// temp data
	assignments = assignmentList;

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const AssignmentList = assignments.map((assignment) => (
		<CourseAssignment assignment={assignment} />
	));

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
