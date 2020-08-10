import React from 'react';
import Login from './components/auth/Login';
import Header from './components/general/Header';
import NavBar from './components/general/NavBar';
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
