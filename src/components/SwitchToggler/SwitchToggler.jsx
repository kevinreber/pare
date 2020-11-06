/** Dependencies */
import React from 'react'
import { PropTypes } from 'prop-types';
import './SwitchToggler.css';

/** MUI */
import Switch from '@material-ui/core/Switch';

/**
 * Switch Toggler.
 * 
 * @param {boolean}     checked         Checked value of SwitchToggle.
 * @param {function}    handleChange    Callback that toggles checked value.
 * @param {string}      name            Name of input value.
 */
function SwitchToggle({ checked, handleChange, name }) {
    return (
        <div className='Switch-Toggle'>
            <Switch
            checked={checked}
            onChange={handleChange}
            name={name}
            />   
        </div>
    )
}

SwitchToggle.propTypes = {
    checked: PropTypes.bool,
    handleChange: PropTypes.func,
    name: PropTypes.string
}

export default SwitchToggle;
