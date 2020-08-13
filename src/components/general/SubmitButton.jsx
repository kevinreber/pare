import React from 'react';

function SubmitButton({ text }) {
	return (
		<div className='container w-75'>
			<button className='btn mate-btn mate-btn-primary mate-btn-submit'>
				{text}
			</button>
		</div>
	);
}

export default SubmitButton;
