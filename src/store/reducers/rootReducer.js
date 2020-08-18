import authReducer from './authReducer';
import courseReducer from './courseReducer';
import assignmentReducer from './assignmentReducer';
import user from './userReducer';
import { combineReducers } from 'redux';

/** Sync to data in Firebase/Firestore */
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	user: user,
	auth: authReducer,
	courses: courseReducer,
	assignments: assignmentReducer,
});

export default rootReducer;
