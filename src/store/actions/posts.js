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

/** Formats action data to input to dispatch */
function addPost(post) {
	return {
		type: ADD_POST,
		post,
	};
}

export function deletePostFromFB(postId) {
	return (dispatch) => {
		db.collection('feeds')
			.doc(postId)
			.delete()
			.then(() => {
				console.log('Post removed');
				dispatch(deletePost(postId));
			})
			.catch((err) => dispatch(dispatchError(DELETE_POST_FAIL, err)));
	};
}

/** Formats action data to input to dispatch */
function deletePost(postId) {
	return {
		type: DELETE_POST,
		postId,
	};
}

export function addCommentToPost(postId, comment) {
	return (dispatch) => {
		db.collection('feeds')
			.doc(postId)
			.collection('comments')
			.add(comment)
			.then(() => {
				console.log('Comment successful');
				dispatch(addComment(comment));
			})
			.catch((err) => dispatch(dispatchError(ADD_COMMENT_ON_POST_FAIL, err)));
	};
}

function addComment(post) {
	return {
		type: ADD_COMMENT_ON_POST,
		post,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
