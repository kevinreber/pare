/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import UserProfileHeader from '../components/User/UserProfileHeader';
import UserProfileBody from '../components/User/UserProfileBody';
import ConfirmDialog from '../components/general/ConfirmDialog';
import CTAButton from '../components/general/CTAButton';
import BackButton from '../components/general/BackButton';
import createFbTimestamp from '../utils/createFbTimestamp';
import { addFlashMessage } from '../store/actions/flashMessages';
import createNewMessage from '../utils/createNewMessage';
import './styles/UserProfile.css';
import db from '../config/fbConfig';

/** User Profile component */
function UserProfile() {
	const { userId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const [userAvailability, setUserAvailability] = useState([]);

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
			}

			db.collection('users')
				.doc(userId)
				.onSnapshot((snapshot) => setUser(snapshot.data()));

			db.collection('users')
				.doc(userId)
				.collection('availability')
				.orderBy('day')
				.onSnapshot((snapshot) => 
				setUserAvailability(snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						data: doc.data()
					}
				})));

			// Loading finished
			setIsLoading(false);
		}
		if (userId) {
			getUserData();
		}
	}, [userId, dispatch, history]);

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
			subtitle: "",
			onConfirm: () => {
				sendMessage();
			},
		});
	}

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
			<p className="font-italic">
				<CTAButton text="Edit" />
			</p>
		);

	return (
		<div className="UserProfile">
			{isLoading ? (
				<>
					<p>Loading...</p>
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
						posts={user.posts}
						bio={user.bio}
						organizations={user.organizations}
						classes={user.classes}
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
