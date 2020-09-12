import React from 'react';

/** Call To Action Button */
function CTAButton({ text, danger = false }) {
	return (
		<div className='container w-75'>
			<button
				className={`btn mate-btn  mate-btn-cta ${
					danger ? 'mate-btn-danger' : 'mate-btn-secondary'
				}`}>
				{text}
			</button>
		</div>
	);
}

export default CTAButton;
