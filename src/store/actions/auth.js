/** Helpers */
import { auth, provider } from '../../config/fbConfig';
import createFbTimestamp from '../../utils/createFbTimestamp';
import db from '../../config/fbConfig';

/** Types */
import {
	SET_CURRENT_USER,
	LOGIN_FAIL,
	LOGOUT_USER,
	LOGOUT_FAIL,
} from './types';

/** Checks if user is already in DB
 *  if user is in DB, last log in will be updated
 *  else user will be added to DB
 *
 *  @param {string}
 */
async function checkIfUserExists(user) {
	const getUser = await db.collection('users').doc(user.uid).get();
	console.log(user.exists);

	if (getUser.exists) {
		updateUserLogin(user);
	} else {
		addNewUserToDB(user);
	}
	console.log('done...');
	// return user.exists;
	// if (db.collection('users').doc(userId).get().exists) {
	// 	return true;
	// }
	// return false;
	// console.log(user.exists);
	// return user.exists;
}

/** Adds new User to DB
 *  @param {Object} user
 */
function addNewUserToDB(user) {
	const data = {
		displayName: user.displayName,
		name: {
			first: '',
			last: '',
		},
		bio: '',
		classes: [],
		email: user.email,
		isTutor: false,
		organizations: [],
		phoneNumber: user.phoneNumber,
		photoURL: user.photoURL,
		backgroundImage: '',
		social: {
			linkedin: '',
			github: '',
			portfolio: '',
		},
		school: 'U.C. Berkeley',
		portfolio: [],
		keywords: [],
		availability: {
			Mon: [],
			Tue: [],
			Wed: [],
			Thu: [],
			Fri: [],
			Sat: [],
			Sun: [],
		},
		createdAt: createFbTimestamp(),
		lastLoginAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
	};

	db.collection('users').doc(user.uid).set(data);
	console.log('New user created', data);
}

function updateUserLogin(user) {
	console.log('updating user last login...');
	db.collection('users')
		.doc(user.uid)
		.update({ lastLoginAt: createFbTimestamp() });
}

export function googleLogin() {
	return (dispatch) => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				const token = result.credential.accessToken;
				console.log(token);

				// check if user exists and update user data
				checkIfUserExists(result.user);

				dispatch(setCurrUser(result.user));
			})
			// .then((result) => console.log('Login successful!', result.auth.email))
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
