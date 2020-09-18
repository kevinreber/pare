/** Dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import Header from './components/layout/Header';
import NavBar from './components/layout/NavBar';
import Notification from './components/general/Notification';
import Routes from './routes/Routes';
import { setCurrentUser } from './store/actions/auth';
import { auth } from './config/fbConfig';
import './App.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		function getCurrentUser() {
			// check if user is logged in
			auth.onAuthStateChanged((user) => {
				if (user) {
					dispatch(setCurrentUser(user));
				} else {
					console.log('no user');
				}
			});
		}
		getCurrentUser();
	}, []);

	const currentUser = useSelector((state) => state.auth.user);

	/** if no currentUser is logged in, hide the Header and NavBar */
	return (
		<div className='App'>
			{currentUser ? (
				<>
					<Header />
					<Notification />
					<Routes />
					<NavBar />
				</>
			) : (
				<Routes />
			)}
		</div>
	);
}

export default App;
