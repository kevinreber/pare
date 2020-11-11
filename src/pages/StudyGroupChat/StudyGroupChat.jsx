/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

/** Components & Helpers */
import StudyGroupChatAdmin from './components/StudyGroupChatAdmin/StudyGroupChatAdmin';
import StudyGroupChatFooter from './components/StudyGroupChatFooter/StudyGroupChatFooter';
import NoData from '../../components/NoData/NoData';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import BackButton from '../../components/BackButton/BackButton';
import createFbTimestamp from '../../utils/createFbTimestamp';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { increment } from '../../config/fbConfig';
import db from '../../config/fbConfig';
import './StudyGroupChat.css';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

/** Displays Study Group's Chat
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupChat() {
	const { studyGroupId } = useParams();
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.auth.user);

	const INITIAL_STATE = {
		title: '',
		members: [],
	};
	const [studyGroup, setStudyGroup] = useState({});
	const [studyGroupForm, setStudyGroupForm] = useState(INITIAL_STATE);
	const [groupMembers, setGroupMembers] = useState(null);
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [showAdmin, setShowAdmin] = useState(false);
	const toggleAdmin = () => setShowAdmin((show) => !show);

	/** Scroll to Bottom of Chat */
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);
	useEffect(() => {
		function getData() {
			/** Get Study Group Info */
			db.collection('study-groups')
				.doc(studyGroupId)
				.onSnapshot((snapshot) => setStudyGroup(snapshot.data()));

			/** Get Study Group Members */
			db.collection('study-groups')
				.doc(studyGroupId)
				.collection('users')
				.onSnapshot((snapshot) =>
					setGroupMembers(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);

			/** Get Study Group Messages */
			db.collection('study-groups')
				.doc(studyGroupId)
				.collection('messages')
				.orderBy('createdAt', 'asc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);

			// Verify if user has access to Study Group Chat
			// if (isLoading && studyGroup.users) {
			// 	const userAccess = studyGroup.users.some(
			// 		(user) => user.uid === currentUser.uid
			// 	);
			// 	if (!userAccess) {
			// 		history.push('/study-groups');
			// 		/** Prompt change made */
			// 		dispatch(
			// 			addFlashMessage({
			// 				isOpen: true,
			// 				message: 'Unauthorized Access',
			// 				type: 'error',
			// 			})
			// 		);
			// 	}
			// }

			// add studyGroup.title value to input in StudyGroupChatAdmin
			// if user wants to change Study Group's title
			// ! CHECK members /
			if (isLoading && studyGroup.title && groupMembers) {
				setStudyGroupForm({
					title: studyGroup.title,
					members: groupMembers,
				});
				setIsLoading(false);
			}
		}
		if (studyGroupId) {
			getData();
		}
	}, [studyGroupId, studyGroup, isLoading, groupMembers, setGroupMembers]);

	const handleChange = (e) => {
		if (e === 'reset') {
			setStudyGroupForm((fData) => ({ ...fData, title: studyGroup.title }));
		} else {
			const { name, value } = e.target;
			setStudyGroupForm((fData) => ({ ...fData, [name]: value }));
		}
	};

	const updateStudyGroupTitle = () => {
		/** update DB and make change */
		db.collection('study-groups').doc(studyGroupId).update({
			title: studyGroupForm.title,
			lastUpdatedAt: createFbTimestamp(),
		});
		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Changes Saved',
				type: 'success',
			})
		);
	};

	if (!studyGroup) {
		return <p>Loading...</p>;
	}

	if (showAdmin && groupMembers) {
		return (
			<Modal
				isOpen={showAdmin}
				content={
					<StudyGroupChatAdmin
						studyGroupId={studyGroupId}
						title={studyGroupForm.title}
						members={groupMembers}
						currentUser={currentUser}
						handleChange={handleChange}
						saveChanges={updateStudyGroupTitle}
					/>
				}
				closeModal={toggleAdmin}
				full={true}
			/>
		);
	}

	const sendMessage = (message) => {
		try {
			db.collection('study-groups')
				.doc(studyGroupId)
				.collection('messages')
				.add(message);
			db.collection('study-groups').doc(studyGroupId).update({
				count: increment,
				lastUpdatedAt: createFbTimestamp(),
			});
		} catch (err) {
			console.log(err);
		}
	};

	/** Display Study Group's Chat Messages */
	const StudyGroupChatBody =
		messages && messages.length !== 0 ? (
			messages.map((message, index) => {
				const lastMessage = messages.length - 1 === index;
				return (
					<div
						key={message.id}
						id={message.id}
						ref={lastMessage ? setRef : null}>
						<p
							className={`StudyGroupChatBody__message chat__message ${
								currentUser.uid === message.data.uid ? 'chat__receiver' : ''
							}`}>
							{currentUser.uid !== message.data.uid ? (
								<span className="chat__name">{message.data.displayName}</span>
							) : (
								''
							)}
							{message.data.message}
							<span className="chat__timestamp">
								{message.data.createdAt
									? moment(message.data.createdAt.toDate()).calendar()
									: ''}
							</span>
						</p>
					</div>
				);
			})
		) : (
			<NoData text="messages" />
		);

	return (
		<div className="StudyGroupChat">
			<div className="StudyGroupChat__Header Body-Header bottom-border-header">
				<BackButton />
				<h5 className="StudyGroupChat__Title">{studyGroup.title}</h5>
				<IconButton onClick={toggleAdmin}>
					<MoreHorizOutlinedIcon fontSize="small" />
				</IconButton>
			</div>
			<div
				id="StudyGroupChat__Body"
				className="StudyGroupChat__Body Page__Body">
				{isLoading ? <Loader /> : <>{StudyGroupChatBody}</>}
			</div>
			<div className="StudyGroupChat__Footer">
				<StudyGroupChatFooter send={sendMessage} user={currentUser} />
			</div>
		</div>
	);
}

export default StudyGroupChat;
