/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components */
import CTAButton from '../../components/CTAButton/CTAButton';
import Searchbar from '../../components/SearchBar/Searchbar';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import NoData from '../../components/NoData/NoData';
import StudyGroupList from './components/List/StudyGroupList';
import StudyGroupForm from './components/Form/StudyGroupForm';

/** Helpers */
import { addFlashMessage } from '../../store/actions/flashMessages';
import createNewMessage from '../../utils/createNewMessage';
import db from '../../config/fbConfig';
import './StudyGroups.css';

/** Page that displays a list of user's Study Groups */
export function StudyGroups() {
	const history = useHistory();
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.auth.user);

	const [getUserStudyGroups, setGetUserStudyGroups] = useState(false);
	const [userStudyGroups, setUserStudyGroups] = useState([]);
	const [allStudyGroups, setAllStudyGroups] = useState([]);
	const [filter, setFilter] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	useEffect(() => {
		const getData = async () => {
			await db
				.collection('study-groups')
				.get()
				.then((data) => {
					setAllStudyGroups(
						data.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				})
				.then(() => setGetUserStudyGroups(true))
				.catch((err) => console.log(err));
		};
		if (isLoading) {
			getData();
		}
	}, [allStudyGroups, currentUser.uid, isLoading]);

	useEffect(() => {
		if (getUserStudyGroups) {
			// Filter which Study Groups user is currently in
			const studyGroups = allStudyGroups.filter((studyGroup) => {
				return studyGroup.data.usersList.includes(currentUser.uid);
			});
			setUserStudyGroups(studyGroups);
			setGetUserStudyGroups(false);
			setIsLoading(false);
		}
	}, [allStudyGroups, getUserStudyGroups, currentUser.uid]);

	let List;

	if (filter !== '' && !isLoading && !getUserStudyGroups) {
		// filter study groups to display
		const filteredGroups = userStudyGroups.filter(
			(studyGroup) =>
				studyGroup.data.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
		);

		// if no filtered matches, display 'NoData' component
		List =
			filteredGroups.length > 0 && !isLoading ? (
				<StudyGroupList studyGroups={filteredGroups} />
			) : (
				<NoData text={'matches'} added={false} />
			);
	}
	if (filter === '' && !isLoading && !getUserStudyGroups) {
		List =
			userStudyGroups.length > 0 ? (
				<StudyGroupList studyGroups={userStudyGroups} />
			) : (
				<NoData text={'matches'} added={false} />
			);
	}

	const addStudyGroup = async (data) => {
		// store studyGroupId given back
		const newStudyGroupId = await createNewMessage(
			'study-groups',
			data,
			null,
			null,
			currentUser
		);

		// push user to message
		history.push(`/study-groups/${newStudyGroupId}`);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Study Group Created!',
				type: 'success',
			})
		);
	};

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={
					<StudyGroupForm
						save={addStudyGroup}
						studyGroups={allStudyGroups}
						user={currentUser}
					/>
				}
				closeModal={toggleForm}
				full={true}
			/>
		);
	}

	return (
		<div className="StudyGroups">
			<div className="StudyGroups__Header">
				<h5>My Study Groups</h5>
				<Searchbar value={filter} setValue={setFilter} />
			</div>
			<div className="StudyGroups__Body">
				{isLoading ? <Loader /> : <>{List}</>}
			</div>
			<div className="CourseForm p-3">
				<div onClick={toggleForm} className="font-italic">
					<CTAButton text="Add Study Group" />
				</div>
			</div>
		</div>
	);
}
