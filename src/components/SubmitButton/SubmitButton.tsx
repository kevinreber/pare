import React, { memo } from 'react';
import * as PropTypes from 'prop-types';

interface Props {
	text: string;
	reset?: boolean;
	resetText?: string;
	resetForm?: Function;
	danger?: boolean;
}

/** Submit Button for forms */
const SubmitButton = ({
	text,
	reset = false,
	resetText = 'Clear',
	resetForm,
	danger = false,
}: Props): JSX.Element => {
	return (
		<div className="container w-75">
			<button className="btn mate-btn mate-btn-primary mate-btn-submit">
				{text}
			</button>
			{reset ? (
				<>
					<button
						type="button"
						onClick={() => resetForm}
						className={`btn mate-btn mate-btn-reset 
						${danger ? 'mate-btn-danger' : 'mate-btn-secondary'}`}>
						{resetText}
					</button>
				</>
			) : null}
		</div>
	);
};

SubmitButton.propTypes = {
	text: PropTypes.string,
	reset: PropTypes.bool,
	resetText: PropTypes.string,
	resetForm: PropTypes.func,
	danger: PropTypes.bool,
};

export default memo(SubmitButton);
