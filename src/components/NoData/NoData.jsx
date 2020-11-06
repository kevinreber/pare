import React from 'react';

/** Returns a message if user has not added any data */
function NoData({ text, added = true }) {
	return (
		<p className='font-italic p-3'>
			No {text} {added ? 'added' : ''}
		</p>
	);
}

export default NoData;
