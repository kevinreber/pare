/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import BackButton from '../components/general/BackButton';
import CourseAssignmentList from '../components/CourseInfo/CourseAssignments/CourseAssignmentList';
import CourseInfoHeader from '../components/CourseInfo/CourseInfoHeader';
import CTAButton from '../components/general/CTAButton';
import Modal from '../components/general/Modal';
import AssignmentForm from '../components/CourseInfo/CourseAssignments/AssignmentForm';
import createFbTimestamp from '../utils/createFbTimestamp';
import db from '../config/fbConfig';
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
		db.collection('class')
			.doc(courseId)
			.collection('assignments')
			.add(assignmentData);
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

	// const saveEdit = () => {
	// 	setErrors('');
	// 	if (formData.title === '' && formData.title.trim() === '') {
	// 		setErrors('*Can not leave title empty!');
	// 	} else {
	// 		saveChanges();
	// 		// setShowEdit to false
	// 		setShowEdit(false);
	// 	}
	// };

	const courseInfo = course ? (
		<div className="CourseInfo">
			<div className="CourseInfo__BackBtn">
				<BackButton />
			</div>
			<div className="CourseInfo__Header">
				<CourseInfoHeader
					course={course}
					semester={course.semester}
					sections={course.sections}
					title={`${course.course.abbreviation} ${course.course.course_number}`}
				/>
			</div>
			<div className="CourseInfo__Body">
				<CourseAssignmentList assignments={assignments} />
			</div>
			<div className="AssignmentForm p-3">
				<p onClick={toggleForm} className="font-italic">
					<CTAButton text="Add Assignment" />
				</p>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);

	return <>{courseInfo}</>;
}

export default CourseInfo;
