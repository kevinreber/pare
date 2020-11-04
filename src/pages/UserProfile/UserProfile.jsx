/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import UserProfileHeader from './components/UserProfileHeader';
import UserProfileBody from './components/UserProfileBody';
import UserEditProfileForm from './components/UserEditProfileForm';
import ConfirmDialog from '../../components/general/ConfirmDialog';
import CTAButton from '../../components/general/CTAButton';
import BackButton from '../../components/general/BackButton';
import Loader from '../../components/layout/Loader/Loader';
import Modal from '../../components/general/Modal';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { addFlashMessage } from '../../store/actions/flashMessages';
import createNewMessage from '../../utils/createNewMessage';
import './UserProfile.css';
import db from '../../config/fbConfig';

/** User Profile component */
function UserProfile() {
	const { userId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const [editProfile, setEditProfile] = useState(false);
	const [userAvailability, setUserAvailability] = useState([]);
	const [userCourses, setUserCourses] = useState([]);
	const [userPosts, setUserPosts] = useState(null);

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		async function getUserData() {
			const doc = await db.collection('users').doc(userId).get();

			/** if user doesn't exist, redirect user to '/feed' */
			if (!doc.exists) {
				history.push('/feed');
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: 'User does not exist',
						type: 'error',
					})
				);
			} else {
				db.collection('users')
					.doc(userId)
					.onSnapshot((snapshot) => setUser(snapshot.data()));

				db.collection('users')
					.doc(userId)
					.collection('availability')
					.orderBy('day')
					.onSnapshot((snapshot) =>
						setUserAvailability(
							snapshot.docs.map((doc) => {
								return {
									id: doc.id,
									data: doc.data(),
								};
							})
						)
					);

				db.collection('class')
					.where('users', 'array-contains', userId)
					.onSnapshot((snapshot) =>
						setUserCourses(
							snapshot.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							}))
						)
					);

				db.collection('feeds')
					// firebase does not allow you to use 'where'
					// and 'orderby' on different fields
					.where('userId', '==', userId)
					.get()
					.then((data) => {
						setUserPosts(
							data.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							}))
						);
					})
					.catch((err) => console.log(err));

				// Loading finished
				setIsLoading(false);
			}
		}
		if (userId) {
			getUserData();
		}
	}, [userId, dispatch, history]);

	const toggleEditProfile = () => setEditProfile((edit) => !edit);

	/** Send New Message to User ****************************************/
	const messageData = {
		uid: currentUser.uid,
		users: [currentUser.uid, userId],
		count: 0,
		createdAt: createFbTimestamp(),
		lastUpdatedAt: createFbTimestamp(),
		chats: [],
	};

	const sendMessagePrompt = () => {
		setConfirmDialog({
			isOpen: true,
			title: 'Message user?',
			subtitle: '',
			onConfirm: () => {
				sendMessage();
			},
		});
	};

	const sendMessage = async () => {
		// store messageId given back
		const messageId = await createNewMessage('messages', messageData);

		// push user to message
		history.push(`/messages/${messageId}`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Message Created!',
				type: 'success',
			})
		);
	};
	/******************************************************************* */

	/** if User is viewing their own profile, show edit button instead of message button */
	const DisplayButton =
		userId !== currentUser.uid ? (
			<div onClick={sendMessagePrompt} className="font-italic">
				<CTAButton text="Send Message" />
			</div>
		) : (
			<div onClick={toggleEditProfile} className="font-italic">
				<CTAButton text="Edit" />
			</div>
		);

	const updateUserData = (data) => {
		db.collection('users').doc(userId).update({
			bio: data.bio,
		});
	};

	const saveEdits = (data) => {
		updateUserData(data);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Changes Saved!',
				type: 'success',
			})
		);
		toggleEditProfile();
	};

	if (editProfile) {
		return (
			<Modal
				content={
					<UserEditProfileForm
						bio={user.bio}
						organizations={user.organizations}
						save={saveEdits}
					/>
				}
				closeModal={toggleEditProfile}
			/>
		);
	}

	return (
		<div className="UserProfile">
			{isLoading ? (
				<>
					<Loader />
				</>
			) : (
				<>
					<ConfirmDialog
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
					/>
					<div className="UserProfile__BackBtn">
						<BackButton />
					</div>
					<div className="UserProfile__Header">
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
						posts={userPosts}
						bio={user.bio}
						organizations={user.organizations}
						classes={userCourses}
						email={user.email}
						isTutor={user.isTutor}
						social={user.social}
						keywords={user.keywords}
						portfolio={user.portfolio}
						availability={userAvailability}
					/>
					<div className="UserProfile__Footer">{DisplayButton}</div>
				</>
			)}
		</div>
	);
}

export default UserProfile;
