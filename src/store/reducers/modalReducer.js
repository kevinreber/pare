import { SHOW_MODAL } from '../actions/types';

const INITIAL_STATE = {
	isOpen: false,
	content: null,
	full: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				...state,
				isOpen: action.content.isOpen,
				content: action.content.content,
				full: action.content.full,
			};
		default:
			return state;
	}
};

export default modalReducer;
