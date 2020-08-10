import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Header from './components/general/Header';
import './App.css';

function App() {
	useEffect(() => {}, []);

	return (
		<div className='App'>
      <Header />
			<Login />
		</div>
	);
}

export default App;
