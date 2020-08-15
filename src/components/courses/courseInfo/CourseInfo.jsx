import React from 'react';
import { useParams } from 'react-router-dom';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoBody from './CourseInfoBody';
import Loader from '../../general/Loader';
import { useSelector, useDispatch } from 'react-redux';
import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();

	// get course assignments
	const assignments = useSelector((state) => state.assignments);

	return (
		<>
			(isLoading ? <Loader /> :
			<CourseInfoHeader course={courseId} />
			<CourseInfoBody assignments={assignments} />)
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
