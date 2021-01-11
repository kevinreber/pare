/** Helpers */
import { auth, provider } from '../../config/fbConfig';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { isMobile } from 'react-device-detect';
import db from '../../config/fbConfig';

// import firebase from 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

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
	const userRef = db.collection('users').doc(user.uid);

	await userRef
		.get()
		.then(async (doc) => {
			if (doc.exists) {
				updateUserLogin(user);
			} else {
				addNewUserToDB(user);
			}
		})
		.catch((err) => console.log(err));
}

/** Adds new User to DB
 *  @param {Object} user
 */
async function addNewUserToDB(user) {
	const data = {
		uid: user.uid,
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
		createdAt: createFbTimestamp(),
		lastLoginAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
	};

	const days = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday',
	];

	await db.collection('users').doc(user.uid).set(data);

	// set availability
	days.forEach(async (day, idx) => {
		await db
			.collection('users')
			.doc(user.uid)
			.collection('availability')
			.doc(day)
			.set({
				0: {
					start: null,
					end: null,
					idx: 0,
				},
				day: idx + 1,
			});
	});
	console.log('New user created', data);
}

async function updateUserLogin(user) {
	console.log('updating user last login...');
	await db
		.collection('users')
		.doc(user.uid)
		.update({ lastLoginAt: createFbTimestamp() });
}

export function googleLogin() {
	if (isMobile) {
		return (dispatch) => {
			auth
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					auth.signInWithRedirect(provider).then(async (result) => {
						// Check if user exists - account will be made for new users.
						await checkIfUserExists(result.user);

						db.collection('users')
							.doc(result.user.uid)
							.get()
							.then((doc) => {
								return dispatch(setCurrUser(doc.data()));
							});
					});
				})
				.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
		};
	} else {
		return (dispatch) => {
			auth
				.setPersistence(firebase.auth.Auth.Persistence.SESSION)
				.then(() => {
					auth.signInWithPopup(provider).then(async (result) => {
						// Check if user exists - account will be made for new users.
						await checkIfUserExists(result.user);

						db.collection('users')
							.doc(result.user.uid)
							.get()
							.then((doc) => {
								return dispatch(setCurrUser(doc.data()));
							});
					});
				})
				.catch((err) => dispatch(dispatchError(LOGIN_FAIL, err)));
		};
	}
}

export function setCurrentUser(user) {
	return (dispatch) => {
		db.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				dispatch(setCurrUser(doc.data()));
			})
			.catch((err) => console.log(err));
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

export function deleteAccount(id) {
	return (dispatch) => {
		auth
			.signOut()
			.then(() => {
				console.log('Sign out successful');
				dispatch(logOutUser(LOGOUT_USER));
			})
			.then(() => {
				db.collection('users').doc(id).delete();
			})
			.then(() => {
				console.log('Account successfully deleted!');
			})
			.catch((err) => {
				console.error('Error removing account: ', err);
			});
	};
}

function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
