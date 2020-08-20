import {
	FETCH_COURSES,
	FETCH_COURSE,
	ADD_COURSE,
	REMOVE_COURSE,
	ADD_ASSIGNMENT,
} from './types';

export function fetchCoursesfromFB(courses) {
	return (dispatch, { getFirebase, getFirestore }) => {
		const response = courses;

		// make async call to DB
		return dispatch(getCourses(response));
	};
}

/** Formats action data to input to dispatch */
function getCourses(courses) {
	return {
		type: FETCH_COURSES,
		courses,
	};
}

export function fetchCoursefromFB(courses) {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirebase().firestore();

		firestore
			.get({ collection: 'class', where: ['id', '==', 355] })
			.then((resp) => {
				dispatch(getCourse(resp));
			})
			.catch((err) => {
				dispatch(dispatchError('GET_COURSE_ERROR', err));
			});
	};
}

/** Formats action data to input to dispatch */
function getCourse(course) {
	return {
		type: FETCH_COURSE,
		course,
	};
}

// export function addCourseToFB(courseMajor, courseNumber, courseSemester) {
export function addCourseToFB({
	courseName,
	courseSemester,
	courseYear,
	courseId,
}) {
	return (dispatch, getState, { getFirebase }) => {
		// console.log(getFirebase);
		const response = { courseName, courseSemester, courseYear, courseId };
		console.log(response);
		// const course = {
		// 	department: 'ARCH',
		// 	instructor: 'Orkand David',
		// 	meetingTime: 'MW,15:00:00-17:59:00',
		// 	number: '100D',
		// 	name: 'Fundamentals of Architectural Design II',
		// 	section: 1,
		// 	term: 'FALL 2020',
		// 	id: 355,
		// };

		// const firestore = getFirebase().firestore();

		// firestore
		// 	.collection('class')
		// 	.add(course)
		// 	.then(() => {
		// 		// make async call to DB
		// 		dispatch(addCourse(course));
		// 	})
		// 	.catch((err) => {
		// 		dispatch(dispatchError('ADD_COURSE_ERROR', err));
		// 	});
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}

/** Formats action data to input to dispatch */
function addCourse(course) {
	return {
		type: ADD_COURSE,
		course,
	};
}

export function removeCourseFromFB(course) {
	return (dispatch, { getFirebase, getFirestore }) => {
		const response = course;

		// make async call to DB
		return dispatch(removeCourse(response));
	};
}

/** Formats action data to input to dispatch */
function removeCourse(course) {
	return {
		type: REMOVE_COURSE,
		course,
	};
}

export function addAssignmentToFB(assignment) {
	return (dispatch, { getFirebase, getFirestore }) => {
		const response = assignment;

		// make async call to DB
		return dispatch(addAssignment(response));
	};
}

/** Formats action data to input to dispatch */
function addAssignment(assignment) {
	return {
		type: ADD_ASSIGNMENT,
		assignment,
	};
}
