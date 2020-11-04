/** Dependencies */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/** Components */
import CTAButton from '../../../components/general/CTAButton';

/** Form to edit User's Profile.
 * UserProfile -> UserProfileBody -> UserEditProfileForm
 *
 * @param 	{string}	bio					User's bio.
 * @param 	{array}		organizations		Array of strings of user's organizations.
 * @param	{function}	save				Saves changes made to User's Profile.
 */
function UserEditProfileForm({ bio, organizations, save }) {
	const INITIAL_STATE = { bio: bio };

	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChanges = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		save(formData);
	};

	return (
		<div className="User-Edit-Profile p-3">
			<h4>Edit Profile</h4>
			<form onSubmit={handleSubmit} className="container Edit-Profile-Form">
				<div className="form-group">
					<label htmlFor="bio" className="float-left">
						About
					</label>
					<textarea
						rows="3"
						id="bio"
						className="form-control mate-form-input"
						onChange={handleChanges}
						type="text"
						name="bio"
						value={formData.bio}
						maxLength="100"
					/>
					<small
						className={`char-count ${
							100 - formData.bio.length <= 10 ? 'error-limit' : ''
						}`}>
						{100 - formData.bio.length} characters remaining
					</small>
				</div>
				<div className="font-italic">
					<CTAButton text="Save Changes" />
				</div>
			</form>
		</div>
	);
}

UserEditProfileForm.propTypes = {
	bio: PropTypes.string,
	organizations: PropTypes.array,
	save: PropTypes.func,
};

export default UserEditProfileForm;
