import React from 'react';

interface NoDataProps {
	text: string;
	added?: boolean;
}

/** Returns a message if user has not added any data */
function NoData({ text, added = true }: NoDataProps) {
	return (
		<p className="font-italic p-3">
			No {text} {added ? 'added' : ''}
		</p>
	);
}

export default NoData;
