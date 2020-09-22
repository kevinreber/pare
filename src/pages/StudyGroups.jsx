/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/Searchbar';
import Modal from '../components/general/Modal';
import NoData from '../components/general/NoData';
import StudyGroupList from '../components/StudyGroups/StudyGroupList';
import StudyGroupForm from '../components/StudyGroups/StudyGroupForm';
import db from '../config/fbConfig';
import './styles/StudyGroups.css';

/** Page that displays a list of user's Study Groups */
function Connect() {
	const currentUser = useSelector((state) => state.auth.user);

	const [studyGroups, setStudyGroups] = useState([]);
	const [filter, setFilter] = useState('');

	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	useEffect(() => {
		db.collection('study-group').onSnapshot((snapshot) =>
			setStudyGroups(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	let List;

	if (filter !== '' && studyGroups && studyGroups.length !== 0) {
		// filter study groups to display
		const filteredGroups = studyGroups.filter(
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
	} else if (studyGroups && studyGroups.length !== 0) {
		List = <StudyGroupList studyGroups={studyGroups} />;
	} else {
		List = <NoData text={'study groups'} />;
	}

	const addStudyGroup = (data) => {
		console.log(data);
		// db.collection('study-group').add(data);
	};

	if (showForm) {
		return (
			<Modal
				content={
					<StudyGroupForm
						save={addStudyGroup}
						studyGroups={studyGroups}
						user={currentUser}
					/>
				}
				closeModal={toggleForm}
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
