import { QUICK_SEARCH_BY_TODAY, QUICK_SEARCH_BY_TYPE } from './types';
import db from '../../config/fbConfig';

export function fetchTodaysEvents(courses) {
	return async (dispatch) => {
		try {
			const today = firebase.firestore.FieldValue.serverTimestamp();

			db.collection('feed').catch((err) => {
				dispatch(dispatchError('SEARCH_ERROR', err));
			});
		} catch (err) {
			console.log(err);
		}
	};
}

/** Formats action data to input to dispatch */
function getTodaysEvents(posts) {
	return {
		type: QUICK_SEARCH_BY_TODAY,
		posts,
	};
}

/** Search Error */
function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
