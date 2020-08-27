import React from 'react';
import Header from './components/layout/Header';
import NavBar from './components/layout/NavBar';
import Routes from './routes/Routes';
import './App.css';

function App() {

	return (
		<div className='App'>
			<Header />
			<Routes />
			<NavBar />
		</div>
	);
}

export default App;
