import { UPDATE_AVAILABILITY } from './types';

import { auth, provider, db } from '../../config/fbConfig';

export function updateAvailability() {
	return (dispatch) => {
		dispatch(setAvailability(dispatch));
	};
}

/** Formats action data to input to dispatch */
function setAvailability(user) {
	return {
		type: UPDATE_AVAILABILITY,
		user,
	};
}

// function dispatchError(type, error) {
// 	return {
// 		type,
// 		error,
// 	};
// }
