import {
	FETCH_COURSES,
	ADD_COURSE,
	REMOVE_COURSE,
	ADD_ASSIGNMENT,
} from './types';

export function fetchCoursesfromFB(courses) {
	return (dispatch) => {
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

export function addCourseToFB(courseMajor, courseNumber, courseSemester) {
	return (dispatch) => {
		// const response = { courseMajor, courseNumber, courseSemester };
		const response = {
			id: 'MA1D',
			semester: 'FALL 2020',
			description: 'This is a course',
		};

		// make async call to DB
		return dispatch(addCourse(response));
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
	return (dispatch) => {
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
	return (dispatch) => {
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
