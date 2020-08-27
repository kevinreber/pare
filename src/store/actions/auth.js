import { SET_AUTH, LOGIN_FAIL } from './types';
import { auth, provider, db } from '../../config/fbConfig';

export function googleLogin() {
	return (dispatch) => {
		auth
			.signInWithPopup(provider)
			.then((result) => dispatch(setAuth(result.user)))
			.then((result) => console.log('Login successful!', result.auth.email))
			.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
	};
}

/** Formats action data to input to dispatch */
function setAuth(auth) {
	return {
		type: SET_AUTH,
		auth,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
