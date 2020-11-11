/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import FindTutors from './components/FindTutors/FindTutors';
import BeTutorForm from './components/BeTutorForm/BeTutorForm';
import db from '../../config/fbConfig';
import './Tutors.css';

function Tutor() {
	const currentUser = useSelector((state) => state.auth.user);

	const [isLoadingTutors, setIsLoadingTutors] = useState(true);
	const [loadTutorsAvailabilities, setLoadTutorsAvailabilities] = useState(
		false
	);
	const [tutors, setTutors] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Gets all available tutors data
		async function getTutors() {
			await db
				.collection('users')
				.where('isTutor', '==', true)
				.get()
				.then((data) => {
					setTutors(
						data.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					);
				})
				.catch((err) => console.log(err));
			setIsLoadingTutors(false);
			setLoadTutorsAvailabilities(true);
		}

		if (isLoadingTutors) {
			getTutors();
		}

		// Gets tutor's availability
		if (loadTutorsAvailabilities) {
			const tutorsCopy = [...tutors];
			tutors.forEach(async (tutor, idx) => {
				// Set tutor's availability
				const availability = await db
					.collection('users')
					.doc(tutorsCopy[idx].id)
					.collection('availability')
					.orderBy('day')
					.get()
					.then((data) => {
						let userAvailability = data.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						});
						return userAvailability;
					})
					.catch((err) => console.log(err));

				tutorsCopy[idx] = {
					...tutorsCopy[idx],
					availability,
				};
			});
			setTutors(tutorsCopy);
			setLoadTutorsAvailabilities(false);
		}
	}, [isLoadingTutors, tutors, loadTutorsAvailabilities]);

	useEffect(() => {
		function getUserTutorInfo() {
			db.collection('users')
				.doc(currentUser.uid)
				.onSnapshot((snapshot) => setUser(snapshot.data()));
		}
		if (currentUser) {
			getUserTutorInfo();
		}
	}, [currentUser]);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('findTutor');
	const toggleTutor = (e) => {
		setActive(e.target.id);
	};

	const TutorsBody =
		active === 'findTutor' ? (
			<FindTutors
				tutors={tutors}
				isLoading={loadTutorsAvailabilities}
				setLoadTutorData={() => setIsLoadingTutors(true)}
			/>
		) : (
			<BeTutorForm uid={currentUser.uid} user={user} />
		);

	return (
		<div className="Tutors">
			<div className="Tutors-Header Body-Header">
				<div className="Tutor-Find-Tutor">
					<h5
						id="findTutor"
						className={
							active === 'findTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Find a Tutor
					</h5>
				</div>
				<div className="Tutor-Be-Tutor">
					<h5
						id="beTutor"
						className={
							active === 'beTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Be a Tutor
					</h5>
				</div>
			</div>
			<div className="Tutors__Body">{TutorsBody}</div>
		</div>
	);
}

export default Tutor;
