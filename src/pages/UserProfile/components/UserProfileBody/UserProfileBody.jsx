/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers*/
import UserFields from '../UserFields/UserFields';

/** Body for User Profile.
 * UserProfile -> UserProfileBody => UserFields
 *
 * @param 	{array}		posts				Array of objects of user's posts.
 * @param 	{string}	bio					User's bio.
 * @param 	{array}		organizations		Array of strings of user's organizations.
 * @param 	{array}		classes				Array of strings of user's courses.
 * @param 	{string}	email				String of user's email
 * @param 	{boolean}	isTutor				Boolean to display user's tutor information.
 * @param 	{object}	social				Object of strings of user's social information.
 * @param 	{array}		keywords			Array of strings of user's tutoring services.
 * @param 	{array}		portfolio			Array of strings of user's portfolio links.
 * @param 	{array}		availability		Array of object of user's availability.
 */
function UserProfileBody({
	posts,
	bio,
	organizations,
	classes,
	email,
	isTutor = false,
	social,
	keywords,
	portfolio,
	availability,
}) {
	const showTutorFields = isTutor ? (
		<>
			<UserFields
				label={'I can help in...'}
				content={keywords}
				chips={true}
				field="keywords"
			/>
			<UserFields label={'Portfolio'} content={portfolio} />
			<UserFields label={'Availability'} content={availability} />
		</>
	) : null;

	return (
		<div className="UserProfile__Body">
			<UserFields label={'About'} content={bio} />
			{/* <UserFields label={'Organizations'} content={organizations} /> */}
			{classes.length > 0 ? (
				<UserFields
					label={'Classes Taken'}
					content={classes}
					chips={true}
					field="courses"
				/>
			) : null}
			{showTutorFields}
		</div>
	);
}

UserProfileBody.propTypes = {
	posts: PropTypes.array,
	bio: PropTypes.string,
	organizations: PropTypes.array,
	classes: PropTypes.array,
	email: PropTypes.string,
	isTutor: PropTypes.bool,
	social: PropTypes.object,
	keywords: PropTypes.array,
	portfolio: PropTypes.array,
	availability: PropTypes.array,
};

export default UserProfileBody;
