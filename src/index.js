/** Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/** React Router */
import { BrowserRouter } from 'react-router-dom';

/** React & React-Redux */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';

/** Redux Thunk */
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/** Firebase */
import firebase from './config/fbConfig';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

// Initialize Redux store
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase })))
);

const rrfProps = {
	firebase,
	config: {},
	dispatch: store.dispatch,
	createFirestoreInstance,
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
