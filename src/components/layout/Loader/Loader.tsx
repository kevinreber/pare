/** Dependencies */
import React, { memo } from 'react';
import './Loader.css';

/** MUI */
import CircularProgress from '@material-ui/core/CircularProgress';

/** Loader Component */
const Loader = (): JSX.Element => {
	return (
		<div id="Mate-Loader" className="Mate-Loader">
			<CircularProgress />
		</div>
	);
};

export default memo(Loader);
