/** Dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import Header from './components/layout/Header/Header';
import NavBar from './components/layout/NavBar/NavBar';
import Notification from './components/Notification/Notification';
import SubModal from './components/SubModal/SubModal';
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
	}, [dispatch]);

	const currentUser = useSelector((state) => state.auth.user);
	const modal = useSelector((state) => state.modal);

	/** if no currentUser is logged in, hide the Header and NavBar */
	return (
		<div className="App">
			{currentUser ? (
				<>
					<Header />
					<Notification />
					{modal.isOpen ? <SubModal /> : <Routes />}
					<NavBar />
				</>
			) : (
				<Routes />
			)}
		</div>
	);
}

export default App;
