import React from 'react';

/** Submit Button for forms */
function SubmitButton({ text, reset = false, resetForm }) {
	return (
		<div className='container w-75'>
			<button className='btn mate-btn mate-btn-primary mate-btn-submit'>
				{text}
			</button>
			{reset ? (
				<>
					<button
						type='button'
						onClick={resetForm}
						className='btn mate-btn mate-btn-secondary mate-btn-reset'>
						Clear
					</button>
				</>
			) : (
				''
			)}
		</div>
	);
}

export default SubmitButton;
