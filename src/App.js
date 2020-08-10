import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [text, setText] = useState({});

	const BASE_URL = 'https://api.apple-cloudkit.com';
	const SUB_URL =
		'/database/1/iCloud.com.ipaycheck.MATE/development/public/records/modify?ckAPIToken=728d8ba03a8bcc1e5e8e4052c0e04c6cc22f257f3772af8cb4c617f9ca332798';

	useEffect(() => {
		// function configureClodKit() {
		// 	CloudKit.configure({
		// 		containers: [
		// 			{
		// 				// To use your own container, replace containerIdentifier and apiToken
		// 				containerIdentifier: 'iCloud.com.ipaycheck.MATE',
		// 				apiToken:
		// 					'728d8ba03a8bcc1e5e8e4052c0e04c6cc22f257f3772af8cb4c617f9ca332798',
		// 				environment: 'development',
		// 			},
		// 		],
		// 	});
		// 	console.log('cloudkitloaded');
		// }

		async function getData() {
			try {
				const result = await axios({
					method: 'GET',
					baseURL: BASE_URL,
					url: SUB_URL,
				});
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
		// configureClodKit();
		getData();
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Hello World</h1>
			</header>
		</div>
	);
}

export default App;
