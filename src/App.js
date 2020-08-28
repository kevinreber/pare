import React from 'react';
import Header from './components/layout/Header';
import NavBar from './components/layout/NavBar';
import Routes from './routes/Routes';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
	const currentUser = useSelector((state) => state.auth.auth);

	/** if no currentUser is logged in, hide the Header and NavBar */
	return (
		<div className='App'>
			{currentUser ? (
				<>
					<Header />
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
