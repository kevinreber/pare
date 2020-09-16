/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import UserProfileHeader from '../components/User/UserProfileHeader';
import UserProfileBody from '../components/User/UserProfileBody';
import CTAButton from '../components/general/CTAButton';
import './styles/UserProfile.css';
import db from '../config/fbConfig';

/** User Profile component */
function UserProfile() {
	const { userId } = useParams();
	/**
	 * ! Fix to map through array or object
	 */
	// const user = useSelector((state) => state.user[id]);

	const history = useHistory();

	const [user, setUser] = useState(null);

	/*
    ! need to try syncing to database
    */
	useEffect(() => {
		if (userId) {
			db.collection('users')
				.doc(userId)
				.onSnapshot((snapshot) => setUser(snapshot.data()));
		}
	}, [userId]);

	/** if user doesn't exist, redirect user to '/feed' */
	if (!user) {
		history.push('/feed');
		/*
		 ! show 'Error' message
		 */
	}

	/** if User is viewing their own profile, show edit button instead of message button */
	const DisplayButton = user ? (
		<CTAButton text='Send Message' />
	) : (
		<CTAButton text='Edit' />
	);

	return (
		<>
			<UserProfileHeader
				id={user.id}
				displayName={user.displayName}
				name={user.name}
				school={user.school}
				avatar={user.image}
				background={user.backgroundImage}
				isTutor={user.isTutor}
			/>
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
	);
}

export default UserProfile;
