import { ADD_FLASH_MESSAGE } from './types';

export function addFlashMessage(message) {
	return (dispatch) => {
		dispatch(flashMessage(message));
	};
}

function flashMessage(message) {
	return {
		type: ADD_FLASH_MESSAGE,
		message,
	};
}
