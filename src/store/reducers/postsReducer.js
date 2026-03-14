import {
	ADD_POST,
	ADD_POST_FAIL,
	DELETE_POST,
	DELETE_POST_FAIL,
	ADD_COMMENT_ON_POST,
	ADD_COMMENT_ON_POST_FAIL,
	REMOVE_COMMENT_ON_POST,
	REMOVE_COMMENT_ON_POST_FAIL,
} from '../actions/types';

const postsReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_POST:
			return state;
		case ADD_POST_FAIL:
			return state;
		case DELETE_POST:
			return state;
		case DELETE_POST_FAIL:
			return state;
		case ADD_COMMENT_ON_POST:
			return state;
		case ADD_COMMENT_ON_POST_FAIL:
			return state;
		case REMOVE_COMMENT_ON_POST:
			return state;
		case REMOVE_COMMENT_ON_POST_FAIL:
			return state;
		default:
			return state;
	}
};

export default postsReducer;
