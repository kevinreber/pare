import authReducer from './authReducer';
import courseReducer from './courseReducer';
import { combineReducers } from 'redux';

/** Sync to data in Firebase/Firestore */
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	auth: authReducer,
	courses: courseReducer,
});

export default rootReducer;
