import {
	FETCH_COURSES,
	FETCH_COURSE,
	ADD_COURSE,
	REMOVE_COURSE,
	ADD_ASSIGNMENT,
} from '../actions/types';

const courseReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_COURSES:
			// return console.log('fetching courses');
			console.log('getting ', action.courses);
			return state;
		case FETCH_COURSE:
			// return console.log('fetching courses');
			console.log('got ', action.course);
			return state;
		case ADD_COURSE:
			console.log('created', action.course);
			// return [...state, action.course];
			return state;
		case 'ADD_COURSE_ERROR':
			console.log('add course error', action.error);
			return state;
		case REMOVE_COURSE:
			return console.log('removing course');
		case ADD_ASSIGNMENT:
			return console.log('adding assignment');
		default:
			return state;
	}
};

export default courseReducer;
