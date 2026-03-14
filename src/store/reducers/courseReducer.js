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
			return state;
		case FETCH_COURSE:
			return state;
		case ADD_COURSE:
			return state;
		case 'ADD_COURSE_ERROR':
			return state;
		case REMOVE_COURSE:
			return state;
		case ADD_ASSIGNMENT:
			return state;
		default:
			return state;
	}
};

export default courseReducer;
