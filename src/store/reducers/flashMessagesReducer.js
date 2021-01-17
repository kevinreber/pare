import { ADD_FLASH_MESSAGE } from '../actions/types';

const INITIAL_STATE = {
	isOpen: false,
	message: '',
	type: '',
};

// interface NotifyProps {
// 	isOpen: boolean;
// 	message: string;
// 	type: string;
// }

const flashMessageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_FLASH_MESSAGE:
			return {
				...state,
				isOpen: action.message.isOpen,
				message: action.message.message,
				type: action.message.type,
			};
		default:
			return state;
	}
};

export default flashMessageReducer;
