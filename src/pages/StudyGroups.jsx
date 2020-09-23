/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components */
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/Searchbar';
import Modal from '../components/general/Modal';
import NoData from '../components/general/NoData';
import StudyGroupList from '../components/StudyGroups/StudyGroupList';
import StudyGroupForm from '../components/StudyGroups/StudyGroupForm';

/** Helpers */
import { addFlashMessage } from '../store/actions/flashMessages';
import createNewMessage from '../utils/createNewMessage';
import db from '../config/fbConfig';
import './styles/StudyGroups.css';

/** Page that displays a list of user's Study Groups */
function Connect() {
	const history = useHistory();
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.auth.user);

	const [userStudyGroups, setUserStudyGroups] = useState([]);
	const [allStudyGroups, setAllStudyGroups] = useState([]);
	const [filter, setFilter] = useState('');

	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	useEffect(() => {
		db.collection('study-group').onSnapshot((snapshot) =>
			setAllStudyGroups(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	useEffect(() => {
		if (allStudyGroups) {
			const userStudyGroups = [];

			// Filter which Study Groups user is currently in
			for (let studyGroup of allStudyGroups) {
				let opt = false;
				for (let user of studyGroup.data.users) {
					if (user.uid === currentUser.uid) {
						opt = true;
					}
				}
				if (opt) {
					userStudyGroups.push(studyGroup);
				}
			}

			setUserStudyGroups(userStudyGroups);
		}
	}, [allStudyGroups, currentUser.uid]);

	let List;

	if (filter !== '' && userStudyGroups && userStudyGroups.length !== 0) {
		// filter study groups to display
		const filteredGroups = allStudyGroups.filter(
			(studyGroup) =>
				studyGroup.data.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
		);

		// if no filtered matches, display 'NoData' component
		List =
			filteredGroups.length > 0 ? (
				<StudyGroupList studyGroups={filteredGroups} />
			) : (
				<NoData text={'matches'} added={false} />
			);
	} else if (userStudyGroups && userStudyGroups.length !== 0) {
		List = <StudyGroupList studyGroups={userStudyGroups} />;
	} else {
		List = <NoData text={'study groups'} />;
	}

	const addStudyGroup = async (data) => {
		// store studyGroupId given back
		const newStudyGroupId = await createNewMessage('study-group', data);

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
			<div className="StudyGroups__Body">{List}</div>
			<div className="CourseForm p-3">
				<p onClick={toggleForm} className="font-italic">
					<CTAButton text="Add Study Group" />
				</p>
			</div>
		</div>
	);
}

export default Connect;
