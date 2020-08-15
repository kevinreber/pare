import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoBody from './CourseInfoBody';
import Loader from '../../general/Loader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import {
	firebaseConnect,
	useFirestoreConnect,
	firestoreConnect,
	withFirestore,
	isLoaded,
	isEmpty,
} from 'react-redux-firebase';

import { fetchCoursefromFB } from '../../../store/actions/courses';

import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo({ course }) {
	const dispatch = useDispatch();

	const stuff = useSelector((state) => state);

	// console.log(stuff);

	// console.log(dispatch(fetchCoursefromFB()));

	console.log(course);
	// console.log(Object.keys(course));
	// const dispatch = useDispatch();
	// const course = courses[courseId];

	// useFirestoreConnect(() => [{ collection: 'class', doc: courseId }]);
	// const cc = useSelector(
	// 	({ firestore: { data } }) => data.class && data.class[courseId]
	// );

	// console.log(cc);

	const [isLoading, setIsLoading] = useState(true);

	if (isLoading) {
		return <Loader />;
	}

	if (course) {
		setIsLoading(false);
		console.log('done...');
	}

	// get course assignments
	// const assignments = useSelector(
	// 	(state) =>
	// 		state.courses.filter((course) => course.id === courseId)[0].assignments
	// );
	// console.log(assignments);
	return (
		<>
			{/* (isLoading ? <Loader /> : */}
			{/* <CourseInfoHeader course={course} /> */}
			{/* <CourseInfoBody assignments={course.assignments} /> */}
			{/* ) */}

			{/* <button onClick={() => firestore.get('class')}>Get Course</button>
			{!isLoaded(course) ? 'Loading' : console.log(course)} */}
		</>
	);
}

// const mapStateToProps = (state, ownProps) => {
// 	const id = ownProps.match.params.courseId;
// 	const courses = state.firestore.data.class;
// 	const course = courses ? courses[id] : null;
// 	return {
// 		course: course,
// 	};
// };

// const mapStateToProps = (state) => {
// 	// console.log(state.firestore.data);
// 	return {
// 		course: state.firestore.data.course,
// 	};
// };

// /** connect to FB collection */
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

/***************************** */
const mapStateToProps = (state, ownProps) => {
	console.log(state.firestore);
	// const course = state.firestore.ordered.class.filter(
	// 	(c) => c.id === +ownProps.match.params.courseId
	// );
	// console.log(course);
	return {
		course: state.firestore.data.course,
	};
};

/** connect to FB collection */
export default compose(
	connect(mapStateToProps),
	firestoreConnect((ownProps) => {
		return [
			{
				collection: 'class',
				// where: ['courseId', '==', 355],
				storeAs: 'course',
			},
		];
	})
)(CourseInfo);

// export default compose(
// 	connect(mapStateToProps),
// 	firestoreConnect((ownProps) => [
// 		{
// 			collection: 'class',
// 			// doc: +ownProps.match.params.courseId,
// 		},
// 	])
// )(CourseInfo);

// export default compose(
// 	withFirestore,
// 	connect((state, ownProps) => ({
// 		course: state.firestore.ordered.class,
// 		where: ['id', '==', +ownProps.match.params.courseId],
// 	}))
// )(CourseInfo);

// export default CourseInfo;
