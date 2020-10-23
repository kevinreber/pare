/** Dependencies */
import React from 'react';
import './Loader.css';

/** MUI */
import CircularProgress from '@material-ui/core/CircularProgress';

/** Loader Component */
function Loader() {
	return (
		<div id='Mate-Loader' className='Mate-Loader'>
			<CircularProgress color='#75F3E7'/>
		</div>
	);
}

export default Loader;
