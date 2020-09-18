import authReducer from './authReducer';
import courseReducer from './courseReducer';
import assignmentReducer from './assignmentReducer';
import user from './userReducer';
import postsReducer from './postsReducer';
import courseCatalogReducer from './courseCatalogReducer';
import availabilityReducer from './availabilityReducer';
import flashMessagesReducer from './flashMessagesReducer';
import { combineReducers } from 'redux';

/** Sync to data in Firebase/Firestore */
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	users: user,
	auth: authReducer,
	posts: postsReducer,
	courses: courseReducer,
	assignments: assignmentReducer,
	availability: availabilityReducer,
	courseCatalog: courseCatalogReducer,
	flashMessages: flashMessagesReducer,
});

export default rootReducer;
