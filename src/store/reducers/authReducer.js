import { SET_AUTH, LOGIN_FAIL } from '../actions/types';

const INITIAL_STATE = {
	auth: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				auth: action.auth,
			};
		case LOGIN_FAIL:
			console.log(action.type, action.error);
			return { ...state, ...action.error };
		default:
			return state;
	}
};

export default authReducer;
