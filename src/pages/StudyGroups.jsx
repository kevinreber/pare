/** Dependencies */
import React, { useState, useEffect } from 'react';

/** Components & Helpers */
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/Searchbar';
import NoData from '../components/general/NoData';
import StudyGroupList from '../components/StudyGroups/StudyGroupList';
import db from '../config/fbConfig';
import './styles/StudyGroups.css';

/** Page that displays a list of user's Study Groups */
function Connect() {
	const [studyGroups, setStudyGroups] = useState([]);
	const [filter, setFilter] = useState('');

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
		const filteredGroups = studyGroups.filter(
			(studyGroup) =>
				studyGroup.data.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
		);

		List =
			filteredGroups.length > 0 ? (
				<StudyGroupList
					studyGroups={
						filteredGroups // filter study groups to display
					}
				/>
			) : (
				<NoData text={'matches'} added={false} />
			);
	} else if (studyGroups && studyGroups.length !== 0) {
		List = <StudyGroupList studyGroups={studyGroups} />;
	} else {
		List = <NoData text={'study groups'} />;
	}
	// let List =
	// 	filter !== '' && studyGroups && studyGroups.length !== 0 ? (
	// 		// filter study groups to display
	// 		<StudyGroupList
	// 			studyGroups={studyGroups.filter(
	// 				(studyGroup) =>
	// 					studyGroup.data.title.toLowerCase().indexOf(filter.toLowerCase()) > -1
	// 			)}
	// 		/>
	// 	) : studyGroups && studyGroups.length !== 0 ? (
	// 		<StudyGroupList studyGroups={studyGroups} />
	// 	) : (
	// 		<NoData text={'study groups'} />
	// 	);

	return (
		<div className='StudyGroups'>
			<div className='Body-Header StudyGroups__Header'>
				<h5>My Study Groups</h5>
				<Searchbar value={filter} setValue={setFilter} />
			</div>
			<div className='StudyGroups__Body'>{List}</div>
			<div className='CourseForm p-3'>
				{/* <p onClick={toggleForm} className='font-italic'> */}
				<CTAButton text='Add Study Group' />
				{/* </p> */}
			</div>
		</div>
	);
}

export default Connect;
