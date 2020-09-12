import { UPDATE_AVAILABILITY } from './types';

import { auth, provider, db } from '../../config/fbConfig';

export function updateAvailability(availability) {
	return (dispatch) => {
		dispatch(setAvailability(availability));
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
