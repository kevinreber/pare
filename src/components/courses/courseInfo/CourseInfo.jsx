import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoBody from './CourseInfoBody';
import CTAButton from '../../general/CTAButton';
import Modal from '../../general/Modal';
import AssignmentForm from './courseAssignments/AssignmentForm';
import { useSelector } from 'react-redux';
import db from '../../../config/fbConfig';
import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();

	const [course, setCourse] = useState(null);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addAssignment = (assignmentData) => {
		console.log(assignmentData);
		setShowForm(false);
	};

	// get course assignments
	const assignments = useSelector((state) => state.assignments);

	useEffect(() => {
		if (courseId) {
			db.collection('class')
				.doc(courseId)
				.onSnapshot((snapshot) => setCourse(snapshot.data()));
		}
	}, [courseId]);

	if (showForm) {
		return (
			<Modal
				content={<AssignmentForm save={addAssignment} />}
				closeModal={toggleForm}
			/>
		);
	}

	console.log(course);
	const courseInfo = course ? (
		<>
			<CourseInfoHeader
				course={course}
				semester={course.semester}
				sections={course.sections}
				title={`${course.course.abbreviation} ${course.course.course_number}`}
			/>
			<CourseInfoBody assignments={assignments} />
			<div className='AssignmentForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Add Assignment' />
				</p>
			</div>
		</>
	) : (
		<p>Loading...</p>
	);

	return <>{courseInfo}</>;
}

export default CourseInfo;
