import {
	FETCH_COURSES,
	ADD_COURSE,
	REMOVE_COURSE,
	ADD_ASSIGNMENT,
} from './types';
import axios from 'axios';
import db from '../../config/fbConfig';
import firebase from 'firebase';

export function fetchCoursesfromFB(courses) {
	return (dispatch) => {
		const response = courses;
		// for (let courseData of response.data.courses) {
		// ! To load all courses onto DB
		// ! Last courses added was { abbreviation: TURKISH, course_number: 15A, id : 10897 }
		// 	try {
		// 		const response = await axios.get(
		// 			`${BASE_URL}/api/catalog/catalog_json/course_box/?course_id=${courseData.id}`
		// 		);
		// 		const course = response.data;
		// 		// append semester
		// 		course.semester = '';

		// 		// Add first user into to class
		// 		course.users = [];

		// 		// store course ID as document ID
		// 		db.collection('courses')
		// 			.doc(course.course.id.toString())
		// 			.set(course)
		// 			.then(() => {
		// 				console.log('added course...', courseData);
		// 			})
		// 			.catch((err) => {
		// 				dispatch(dispatchError('ADD_COURSE_ERROR', err));
		// 			});
		// 	} catch (err) {
		// 		console.log(err);
		// 	}
		// }
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

/** If Course is not yet loaded into Firebase DB */
export function addCourseToFB(
	{ courseName, courseSemester, courseYear, courseId },
	userId
) {
	return async (dispatch) => {
		const BASE_URL = 'https://www.berkeleytime.com';
		const ref = db.collection('courses').doc(courseId);

		ref.get().then(async (doc) => {
			// check if course exists in Firebase DB
			// if course exists, append userId into users list
			if (doc.exists) {
				await ref.update({
					users: firebase.firestore.FieldValue.arrayUnion(userId),
					semester: `${courseSemester} ${courseYear}`,
				});
			} else {
				try {
					const response = await axios.get(
						`${BASE_URL}/api/catalog/catalog_json/course_box/?course_id=${courseId}`
					);
					const course = response.data;
					// append semester
					course.semester = `${courseSemester} ${courseYear}`;

					// Add first user into to class
					course.users = [userId];

					// store course ID as document ID
					db.collection('courses')
						.doc(course.course.id.toString())
						.set(course)
						.then(() => {
							// make async call to DB
							dispatch(addCourse(course));
						})
						.catch((err) => {
							dispatch(dispatchError('ADD_COURSE_ERROR', err));
						});
				} catch (err) {
					console.log(err);
				}
			}
		});
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
