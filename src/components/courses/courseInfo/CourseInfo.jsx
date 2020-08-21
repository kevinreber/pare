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

	const [course, setCourse] = useState({});

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
				.onSnapshot((snapshot) => setCourse(snapshot.data().course));
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

	return (
		<>
			<CourseInfoHeader course={courseId} />
			<CourseInfoBody assignments={assignments} />
			<div className='AssignmentForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Add Assignment' />
				</p>
			</div>
		</>
	);
}

/*
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
	firebaseConnect,
	useFirestoreConnect,
	firestoreConnect,
	withFirestore,
	isLoaded,
	isEmpty,
} from 'react-redux-firebase';
*/

/*
// const mapStateToProps = (state, ownProps) => {
// 	const id = ownProps.match.params.courseId;
// 	const courses = state.firestore.data.class;
// 	const course = courses ? courses[id] : null;
// 	return {
// 		course: course,
// 	};
// };

// const mapStateToProps = (state) => {
// 	return {
// 		course: state.firestore.data.course,
// 	};
// };

//  connect to FB collection 
// export default compose(
// 	connect(mapStateToProps),
// 	firestoreConnect((ownProps) => [
// 		{
// 			collection: 'class',
// 			doc: ownProps.match.params.courseId,
// 			storeAs: 'course',
// 		},
// 	])
// )(CourseInfo);

// ! 
const mapStateToProps = (state, ownProps) => {
	console.log(state.firestore);
	return {
		course: state.firestore.data.course,
	};
};

// connect to FB collection 
export default compose(
	connect(mapStateToProps),
	firestoreConnect((ownProps) => {
		return [
			{
				collection: 'class',
				where: ['courseId', '==', 355],
				storeAs: 'course',
			},
		];
	})
)(CourseInfo);

*/

export default CourseInfo;
