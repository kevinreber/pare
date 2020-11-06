import React from 'react';
import { PropTypes } from 'prop-types';

/** Submit Button for forms */
function SubmitButton({
	text,
	reset = false,
	resetText = 'Clear',
	resetForm,
	danger = false,
}) {
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
						className={`btn mate-btn mate-btn-reset 
						${danger ? 'mate-btn-danger' : 'mate-btn-secondary'}`}>
						{resetText}
					</button>
				</>
			) : null}
		</div>
	);
}

SubmitButton.propTypes = {
	text: PropTypes.string,
	reset: PropTypes.bool,
	resetText: PropTypes.string,
	resetForm: PropTypes.func,
	danger: PropTypes.bool,
};

export default SubmitButton;
