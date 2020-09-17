/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

/** Components & Helpers */
import UserProfileHeader from '../components/User/UserProfileHeader';
import UserProfileBody from '../components/User/UserProfileBody';
import CTAButton from '../components/general/CTAButton';
import BackButton from '../components/general/BackButton';
import './styles/UserProfile.css';
import db from '../config/fbConfig';

/** User Profile component */
function UserProfile() {
	const { userId } = useParams();

	const history = useHistory();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	console.log(userId);

	useEffect(() => {
		if (userId) {
			db.collection('users')
				.doc(userId)
				.onSnapshot((snapshot) => setUser(snapshot.data()));
		}
		if (user) {
			setIsLoading(false);
		}
	}, [user, userId]);

	// if (isLoading) {
	// 	return <p>Loading...</p>;
	// }

	/** if user doesn't exist, redirect user to '/feed' */
	// if (!user) {
	// 	history.push('/feed');
	/*
		 ! show 'Error' message
		 */
	// }

	/** if User is viewing their own profile, show edit button instead of message button */
	const DisplayButton = user ? (
		<CTAButton text='Send Message' />
	) : (
		<CTAButton text='Edit' />
	);

	return (
		<div className='UserProfile'>
			{isLoading && !user ? (
				<>
					<p>Loading...</p>
				</>
			) : (
				<>
					<div className='UserProfile__BackBtn'>
						<BackButton />
					</div>
					<div className='UserProfile__Header'>
						<UserProfileHeader
							id={userId}
							displayName={user.displayName}
							name={user.name}
							school={user.school}
							avatar={user.photoURL}
							background={user.backgroundImage}
							isTutor={user.isTutor}
						/>
					</div>
					<UserProfileBody
						posts={user.posts}
						bio={user.bio}
						organizations={user.organizations}
						classes={user.classes}
						email={user.email}
						isTutor={user.isTutor}
						social={user.social}
						keywords={user.keywords}
						availability={user.availability}
					/>
					{DisplayButton}
				</>
			)}
		</div>
	);
}

export default UserProfile;
