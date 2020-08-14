import React from 'react';

function CTAButton({ text }) {
	return (
		<div className='container w-75'>
			<button className='btn mate-btn mate-btn-secondary mate-btn-cta'>
				{text}
			</button>
		</div>
	);
}

export default CTAButton;
