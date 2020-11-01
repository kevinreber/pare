import React from 'react';
import { PropTypes } from 'prop-types';

/** Submit Button for forms */
function SubmitButton({ text, reset = false, resetForm }) {
	return (
		<div className="container w-75">
			<button className="btn mate-btn mate-btn-primary mate-btn-submit">
				{text}
			</button>
			{reset ? (
				<>
					<button
						type="button"
						onClick={resetForm}
						className="btn mate-btn mate-btn-secondary mate-btn-reset">
						Clear
					</button>
				</>
			) : null}
		</div>
	);
}

SubmitButton.propTypes = {
	text: PropTypes.string,
	reset: PropTypes.bool,
	resetForm: PropTypes.func,
};

export default SubmitButton;
