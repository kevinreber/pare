/** Dependencies */
import React from 'react';
import * as PropTypes from 'prop-types';

interface Props {
	text: string;
	danger: boolean;
}

/** Call To Action Button
 * @param {string}	 text	 Text to display inside CTA Button.
 * @param {boolean}	 danger	 Boolean to change color of CTA Button.
 */
function CTAButton({ text, danger = false }: Props): JSX.Element {
	return (
		<div className="container w-75">
			<button
				className={`btn mate-btn  mate-btn-cta ${
					danger ? 'mate-btn-danger' : 'mate-btn-secondary'
				}`}>
				{text}
			</button>
		</div>
	);
}

CTAButton.propTypes = {
	text: PropTypes.string,
	danger: PropTypes.bool,
};

export default CTAButton;
