import {
	ADD_POST,
	ADD_POST_FAIL,
	DELETE_POST,
	DELETE_POST_FAIL,
	ADD_COMMENT_ON_POST,
	ADD_COMMENT_ON_POST_FAIL,
	REMOVE_COMMENT_ON_POST,
	REMOVE_COMMENT_ON_POST_FAIL,
} from './types';
import db from '../../config/fbConfig';

/** Formats action data to input to dispatch */
export function addPostToFB(post) {
	return (dispatch) => {
		db.collection('feeds')
			.add(post)
			.then(() => {
				console.log('Post successful');
				dispatch(addPost(post));
			})
			.catch((err) => dispatch(dispatchError(ADD_POST_FAIL, err)));
	};
}

function addPost(post) {
	return {
		type: ADD_POST,
		post,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
