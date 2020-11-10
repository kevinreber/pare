import {
	SET_CURRENT_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	LOGOUT_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
	user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				user: action.user,
			};
		case LOGIN_FAIL:
			console.log(action.type, action.error);
			return { ...state, ...action.error };
		case LOGOUT_USER:
			return { ...state, user: null };
		case LOGOUT_FAIL:
			console.log(action.type, action.error);
			return { ...state, ...action.error };
		default:
			return state;
	}
};

export default authReducer;
