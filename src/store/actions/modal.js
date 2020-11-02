import { SHOW_MODAL } from './types';

export function showModalContent(content) {
	return (dispatch) => {
		dispatch(showModal(content));
	};
}

function showModal(content) {
	return {
		type: SHOW_MODAL,
		content,
	};
}
