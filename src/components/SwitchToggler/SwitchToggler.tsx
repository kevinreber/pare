/** Dependencies */
import React, { memo, ChangeEvent } from 'react';
import * as PropTypes from 'prop-types';
import './SwitchToggler.css';

/** MUI */
import Switch from '@material-ui/core/Switch';

interface Props {
	checked: boolean;
	handleChange: Function;
	name: string;
}

/**
 * Switch Toggler.
 *
 * @param {boolean}     checked         Checked value of SwitchToggle.
 * @param {function}    handleChange    Callback that toggles checked value.
 * @param {string}      name            Name of input value.
 */
function SwitchToggle({ checked, handleChange, name }: Props): JSX.Element {
	const hChange = (e: ChangeEvent<HTMLInputElement>): void => {
		handleChange(e);
	};

	return (
		<div className="Switch-Toggle">
			<Switch checked={checked} onChange={hChange} name={name} />
		</div>
	);
}

SwitchToggle.propTypes = {
	checked: PropTypes.bool,
	handleChange: PropTypes.func,
	name: PropTypes.string,
};

export default memo(SwitchToggle);
