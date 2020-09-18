import { ADD_NEW_MESSAGE } from './types';
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
					dispatch(dispatchError('ADD_NEW_CHAT_ERROR', err));
				});
		} catch (err) {
			console.log(err);
		}
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}

/** Formats action data to input to dispatch */
function addNewMessage(message) {
	return {
		type: ADD_NEW_MESSAGE,
		message,
	};
}
