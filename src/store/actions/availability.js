import { UPDATE_AVAILABILITY } from './types';

import { auth, provider, db } from '../../config/fbConfig';

export function updateAvailability(userAvailability) {
	return (dispatch) => {
		dispatch(setAvailability(userAvailability));
	};
}

/** Formats action data to input to dispatch */
function setAvailability(availability) {
	return {
		type: UPDATE_AVAILABILITY,
		availability,
	};
}

// function dispatchError(type, error) {
// 	return {
// 		type,
// 		error,
// 	};
// }
