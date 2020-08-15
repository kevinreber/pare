import React from 'react';
import './styles/Loader.css';
const Spinner = require('react-spinkit');

function Loader() {
	return (
		<>
			<Spinner
				id='Mate-Loader'
				className='Mate-Loader'
				name='pulse'
				color='#75F3E7'
			/>
		</>
	);
}

export default Loader;
