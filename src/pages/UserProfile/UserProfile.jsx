/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import UserProfileHeader from './components/Header/UserProfileHeader';
import UserProfileBody from './components/Body/UserProfileBody';
import UserEditProfileForm from './components/EditForm/UserEditProfileForm';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import CTAButton from '../../components/CTAButton/CTAButton';
import BackButton from '../../components/BackButton/BackButton';
import Loader from '../../components/layout/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { deleteAccount } from '../../store/actions/auth';
import createNewMessage from '../../utils/createNewMessage';
import { FB, MESSAGE, CONFIRM } from './constants/index';
import './UserProfile.css';
import db from '../../config/fbConfig';

/** User Profile component */
export function UserProfile() {
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
			const doc = await db.collection(FB.users).doc(userId).get();

			/** if user doesn't exist, redirect user to '/feed' */
			if (!doc.exists) {
				history.push('/feed');
				dispatch(
					addFlashMessage({
						isOpen: true,
						message: MESSAGE.noUser,
						type: MESSAGE.error,
					})
				);
			} else {
				db.collection(FB.users)
					.doc(userId)
					.onSnapshot((snapshot) => setUser(snapshot.data()));

				db.collection(FB.users)
					.doc(userId)
					.collection(FB.availability)
					.orderBy(FB.day)
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

				db.collection(FB.courses)
					.where(FB.users, 'array-contains', userId)
					.onSnapshot((snapshot) =>
						setUserCourses(
							snapshot.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							}))
						)
					);

				db.collection(FB.feeds)
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
			title: MESSAGE.sendMessage,
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
				message: MESSAGE.sentMessage,
				type: MESSAGE.success,
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
		db.collection(FB.users).doc(userId).update({
			bio: data.bio,
		});
	};

	const saveEdits = (data) => {
		updateUserData(data);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.updateAccount,
				type: MESSAGE.success,
			})
		);
		toggleEditProfile();
	};

	/** User Deletes Account ****************************/
	const deleteAccountPrompt = () => {
		setEditProfile(false);
		setConfirmDialog({
			isOpen: true,
			title: CONFIRM.title,
			subtitle: CONFIRM.subtitle,
			onConfirm: () => {
				deleteUserAccount();
			},
		});
	};

	const deleteUserAccount = () => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});

		dispatch(deleteAccount(userId));
	};
	/****************************************************/

	if (editProfile) {
		return (
			<Modal
				isOpen={editProfile}
				content={
					<UserEditProfileForm
						bio={user.bio}
						organizations={user.organizations}
						save={saveEdits}
						deleteAccount={deleteAccountPrompt}
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
						type="success"
					/>
					<div className="UserProfile__Header">
						<BackButton />
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
