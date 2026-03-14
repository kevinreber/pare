/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/** Components & Helpers */
import FindTutors from './components/FindTutors/FindTutors';
import BeTutorForm from './components/TutorForm/BeTutorForm';
import { FB } from './constants/index';
import db from '../../config/fbConfig';
import './Tutors.css';

export function Tutors() {
	const currentUser = useSelector((state) => state.auth.user);

	const [isLoadingTutors, setIsLoadingTutors] = useState(true);
	const [loadTutorsAvailabilities, setLoadTutorsAvailabilities] = useState(
		false
	);
	const [tutors, setTutors] = useState([]);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Gets all available tutors data
		async function getTutors() {
			await db
				.collection(FB.collection)
				.where(FB.isTutor, '==', true)
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
				.catch(() => {
					setError('Failed to load tutors. Please try again.');
				});
			setIsLoadingTutors(false);
			setLoadTutorsAvailabilities(true);
		}

		if (isLoadingTutors) {
			getTutors();
		}
	}, [isLoadingTutors, tutors]);

	useEffect(() => {
		let unsubUser;

		function getUserTutorInfo() {
			unsubUser = db.collection(FB.collection)
				.doc(currentUser.uid)
				.onSnapshot((snapshot) => setUser(snapshot.data()));
		}
		if (currentUser) {
			getUserTutorInfo();
		}

		return () => {
			if (unsubUser) unsubUser();
		};
	}, [currentUser]);

	useEffect(() => {
		// Gets tutor's availability
		const getTutors = () => {
			const tutorsCopy = [...tutors];
			tutors.forEach(async (tutor, idx) => {
				// Set tutor's availability
				const availability = await db
					.collection(FB.collection)
					.doc(tutorsCopy[idx].id)
					.collection(FB.availability)
					.orderBy(FB.day)
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
					.catch(() => {});

				tutorsCopy[idx] = {
					...tutorsCopy[idx],
					availability,
				};
			});

			setTutors(tutorsCopy);
			setLoadTutorsAvailabilities(false);
		};
		if (loadTutorsAvailabilities) {
			getTutors();
		}
	}, [tutors, loadTutorsAvailabilities]);

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
			<div className="Tutors-Header Body-Header" role="tablist">
				<div className="Tutor-Find-Tutor">
					<h5
						id="findTutor"
						role="tab"
						aria-selected={active === 'findTutor'}
						tabIndex={0}
						className={
							active === 'findTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								toggleTutor(e);
							}
						}}>
						Find a Tutor
					</h5>
				</div>
				<div className="Tutor-Be-Tutor">
					<h5
						id="beTutor"
						role="tab"
						aria-selected={active === 'beTutor'}
						tabIndex={0}
						className={
							active === 'beTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								toggleTutor(e);
							}
						}}>
						Be a Tutor
					</h5>
				</div>
			</div>
			<div className="Tutors__Body">
				{error ? <div className="alert errors">{error}</div> : TutorsBody}
			</div>
		</div>
	);
}
