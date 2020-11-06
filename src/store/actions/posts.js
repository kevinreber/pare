import {
	ADD_POST,
	ADD_POST_FAIL,
	EDIT_POST,
	EDIT_POST_FAIL,
	DELETE_POST,
	DELETE_POST_FAIL,
	ADD_COMMENT_ON_POST,
	ADD_COMMENT_ON_POST_FAIL,
	REMOVE_COMMENT_ON_POST,
	REMOVE_COMMENT_ON_POST_FAIL,
} from './types';

/** Helpers */
import { increment, decrement, storage } from '../../config/fbConfig';
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

export function deletePostFromFB(postId, userId, image = '') {
	return (dispatch) => {
		if (image && image !== '') {
			const storageRef = storage.ref();
			const storageImage = storageRef.child(`feed/${userId}/${image}`);

			storageImage.delete();
			console.log('Removed image');
		}

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

/** Update edited version of post */
export function editPostInFB(id, data) {
	return (dispatch) => {
		db.collection('feeds')
			.doc(id)
			.set(data)
			.then(() => {
				console.log('Post updated');
				dispatch(editPost(id, data));
			})
			.catch((err) => dispatch(dispatchError(EDIT_POST_FAIL, err)));
	};
}

/** Formats action data to input to dispatch */
function editPost(postId) {
	return {
		type: EDIT_POST,
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
		db.collection('feeds').doc(postId).update({
			num_of_comments: increment,
		});
	};
}

function addComment(post) {
	return {
		type: ADD_COMMENT_ON_POST,
		post,
	};
}

export function deleteCommentFromPost(postId, commentId) {
	return (dispatch) => {
		db.collection('feeds')
			.doc(postId)
			.collection('comments')
			.doc(commentId)
			.delete()
			.then(() => {
				console.log('Comment removed');
				dispatch(deleteComment(commentId));
			})
			.catch((err) =>
				dispatch(dispatchError(REMOVE_COMMENT_ON_POST_FAIL, err))
			);
		db.collection('feeds').doc(postId).update({
			num_of_comments: decrement,
		});
	};
}

/** Formats action data to input to dispatch */
function deleteComment(postId) {
	return {
		type: REMOVE_COMMENT_ON_POST,
		postId,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
