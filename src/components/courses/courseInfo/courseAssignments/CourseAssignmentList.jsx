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

	return <>{AssignmentList}</>;
}

export default CourseAssignmentList;
