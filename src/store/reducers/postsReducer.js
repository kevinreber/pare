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
			console.log('created post', action.post);
			return state;
		case ADD_POST_FAIL:
			console.log(action.type, action.error);
			return state;
		case DELETE_POST:
			console.log('removed post', action.post);
			return state;
		case DELETE_POST_FAIL:
			console.log(action.type, action.error);
			return state;
		case ADD_COMMENT_ON_POST:
			console.log('created comment', action.comment);
			return state;
		case ADD_COMMENT_ON_POST_FAIL:
			console.log(action.type, action.error);
			return state;
		case REMOVE_COMMENT_ON_POST:
			console.log('removed comment', action.comment);
			return state;
		case REMOVE_COMMENT_ON_POST_FAIL:
			console.log(action.type, action.error);
			return state;
		default:
			return state;
	}
};

export default postsReducer;
