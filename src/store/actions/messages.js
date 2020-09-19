import {
	ADD_NEW_MESSAGE,
	ADD_NEW_MESSAGE_ERROR,
	DELETE_MESSAGE,
	DELETE_MESSAGE_FAIL,
} from './types';
import db from '../../config/fbConfig';

export function addNewMessageToFB(data) {
	return (dispatch) => {
		try {
			db.collection('messages')
				.add(data)
				.then((res) => console.log(res))
				.then(() => {
					// make async call to DB
					dispatch(addNewMessage(data));
				})
				.catch((err) => {
					dispatch(dispatchError(ADD_NEW_MESSAGE_ERROR, err));
				});
		} catch (err) {
			console.log(err);
		}
	};
}

/** Formats action data to input to dispatch */
function addNewMessage(message) {
	return {
		type: ADD_NEW_MESSAGE,
		message,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}

export function deleteMessageFromFB(messageId) {
	return (dispatch) => {
		db.collection('messages')
			.doc(messageId)
			.delete()
			.then(() => {
				console.log('Message Deleted');
				dispatch(deleteMessage(messageId));
			})
			.catch((err) => dispatch(dispatchError(DELETE_MESSAGE_FAIL, err)));
	};
}

function deleteMessage(messageId) {
	return {
		type: DELETE_MESSAGE,
		messageId,
	};
}
