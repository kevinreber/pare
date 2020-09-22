import {
	JOIN_STUDY_GROUP,
	JOIN_STUDY_GROUP_ERROR,
	DELETE_STUDY_GROUP,
	DELETE_STUDY_GROUP_FAIL,
} from './types';
import db from '../../config/fbConfig';

export function addNewStudyGroup(data) {
	return (dispatch) => {
		db.collection('study-groups')
			.add(data)
			.then((res) => console.log(res))
			.then(() => {
				// make async call to DB
				dispatch(addNewStudyGroupToFB(data));
			})
			.catch((err) => {
				dispatch(dispatchError(JOIN_STUDY_GROUP_ERROR, err));
			});
	};
}

/** Formats action data to input to dispatch */
function addNewStudyGroupToFB(message) {
	return {
		type: JOIN_STUDY_GROUP,
		message,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
