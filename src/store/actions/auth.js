import {
	SET_CURRENT_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	LOGOUT_FAIL,
} from './types';
import { auth, provider, db } from '../../config/fbConfig';

export function googleLogin() {
	return (dispatch) => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				const token = result.credential.accessToken;
				console.log(token);
				dispatch(setCurrUser(result.user));
			})
			.then((result) => console.log('Login successful!', result.auth.email))
			.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
	};
}

export function setCurrentUser(user) {
	return (dispatch) => {
		dispatch(setCurrUser(user));
	};
}

/** Formats action data to input to dispatch */
function setCurrUser(user) {
	return {
		type: SET_CURRENT_USER,
		user,
	};
}

export function logOut() {
	return (dispatch) => {
		auth
			.signOut()
			.then(() => {
				console.log('Sign out successful');
				dispatch(logOutUser(LOGOUT_USER));
			})
			.catch((err) => dispatch(dispatchError(LOGOUT_FAIL, err)));
	};
}

function logOutUser(user) {
	return {
		type: LOGOUT_USER,
		user,
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
