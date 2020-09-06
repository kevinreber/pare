/** Dependencies */
import React from 'react';

/** Components & Helpers */
import UserFields from './UserFields';

/** Body for User Profile */
function UserProfileBody({
	posts,
	bio,
	organizations,
	classes,
	email,
	isTutor,
	social,
	keywords,
	availability,
}) {
	const obj = {
		email,
		social,
	};
	const showTutorFields = isTutor ? (
		<>
			<UserFields label={'I can help in...'} content={keywords} />
			<UserFields label={'Portfolio'} content={'www.google.com'} />
			<UserFields label={'Availability'} content={availability} />
			{/* <UserFields label={'test'} content={obj} />
			<UserFields label={'test'} content={obj} />
			<UserFields label={'test'} content={obj} />
			<UserFields label={'test'} content={obj} />
			<UserFields label={'test'} content={obj} />
			<UserFields label={'test'} content={obj} /> */}
		</>
	) : (
		<></>
	);

	return (
		<div className='User-Profile User-Profile-Body'>
			<UserFields label={'About'} content={bio} />
			<UserFields label={'Organizations'} content={organizations} />
			<UserFields label={'Classes Taken'} content={classes} />
			{showTutorFields}
		</div>
	);
}

export default UserProfileBody;
