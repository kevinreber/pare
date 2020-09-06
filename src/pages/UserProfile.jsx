/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import UserProfileHeader from '../components/User/UserProfileHeader';
import UserProfileBody from '../components/User/UserProfileBody';
import CTAButton from '../components/general/CTAButton';
import './styles/UserProfile.css';
import db from '../config/fbConfig';

/** User Profile component */
function UserProfile() {
	const { id } = useParams();
	/**
	 * ! Fix to map through array or object
	 */
	const user = useSelector((state) => state.user[id]);

	/*
    ! need to try syncing to database
    */
	useEffect(() => {
		async function getUserData() {
			// const await = db.collection('users').doc('yuJSHIcQUguN9HY0FSq7')
		}

		getUserData();
	}, []);

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
