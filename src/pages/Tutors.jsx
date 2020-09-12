/** Dependencies */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import TutorList from '../components/Tutors/TutorList';
import BeTutorForm from '../components/Tutors/BeTutorForm';
import { updateAvailability } from '../store/actions/availability';
import './styles/Tutors.css';

const tutorsDemo = [
	{
		id: 1,
		name: 'John',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Computer Science',
		classes: 'Math1A, CS61A, CS61B',
	},
	{
		id: 2,
		name: 'Angela',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Computer Science',
		classes: 'Math1A, CS61A, CS61B',
	},
	{
		id: 3,
		name: 'Tony',
		avatar: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
		tutorSubjects: 'Math',
		classes: 'Math1A, CS61A, CS61B',
	},
];

function Tutor() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);
	const userAvailability = useSelector((state) => state.availability);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('findTutor');
	const toggleTutor = (e) => {
		setActive(e.target.id);
	};

	// Toggle form for User to Add Course
	const [showSearch, setShowSearch] = useState(false);
	const toggleSearch = () => setShowSearch((show) => !show);

	const updateUser = (data) => {
		console.log('updating...');
		dispatch(updateAvailability(data));
	};

	const TutorsBody =
		active === 'findTutor' ? (
			<TutorList tutors={tutorsDemo} />
		) : (
			<BeTutorForm
				user={currentUser}
				save={updateUser}
				availability={userAvailability}
			/>
		);

	return (
		<div className='Tutors'>
			<div className='Tutors-Header Body-Header'>
				<div className='Tutor-Find-Tutor'>
					<h5
						id='findTutor'
						className={
							active === 'findTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Find a Tutor
					</h5>
				</div>
				<div className='Tutor-Be-Tutor'>
					<h5
						id='beTutor'
						className={
							active === 'beTutor' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleTutor}>
						Be a Tutor
					</h5>
				</div>
			</div>
			<div className='Tutors__Body'>
				{TutorsBody}
				{/* <div className='Courses-CourseList'>{courseList}</div>
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Join Class' />
				</p>
			</div> */}
			</div>
		</div>
	);
}

export default Tutor;
