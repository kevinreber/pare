import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import Modal from '../general/Modal';
import NoData from '../general/NoData';
import CTAButton from '../general/CTAButton';
import { useDispatch } from 'react-redux';
import { addCourseToFB } from '../../store/actions/courses';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './styles/Courses.css';

// const BASE_URL = 'https://www.berkeleytime.com/api';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
function Courses({ courses }) {
	const dispatch = useDispatch();

	// build list of courses, if no courses exist return 'No courses added'
	const courseList =
		courses && courses.length !== 0 ? (
			<CourseList courses={courses} />
		) : (
			<NoData text={'courses'} />
		);

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('current');
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	const [courseCatalog, setCourseCatalog] = useState({});

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addCourse = (courseData) => {
		console.log(courseData);
		dispatch(addCourseToFB(courseData));
		setShowForm(false);
	};

	useEffect(() => {
		async function getCourseCatalog() {
			try {
				const resp = await axios.get('/api/catalog/catalog_json/', {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.12 (KHTML, like Gecko) Version/11.1 Safari/605.1.12',
						Accept: 'application/json',
					},
				});
				/** 
				await fetch('/api/catalog/catalog_json/', {
					method: 'GET',
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache',
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
						'Content-Type': 'application/json',
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
				}).then((resp) => console.log(resp));
				*/
				console.log(resp.data);
			} catch (error) {
				console.log(error);
			}
		}

		getCourseCatalog();
	}, []);

	if (showForm) {
		return (
			<Modal
				content={<CourseForm save={addCourse} />}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<>
			<div className='Courses-Header d-flex justify-content-around pt-2 pb-3'>
				<div className='Courses-Current'>
					<h5
						id='current'
						className={
							active === 'current' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Current Semester
					</h5>
				</div>
				<div className='Courses-Past'>
					<h5
						id='past'
						className={
							active === 'past' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Past Semester
					</h5>
				</div>
			</div>
			<div className='Courses-CourseList'>{courseList}</div>
			<div className='CourseForm p-3'>
				<p onClick={toggleForm} className='font-italic'>
					<CTAButton text='Join Class' />
				</p>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		courses: state.firestore.ordered.class,
	};
};

/** connect to FB collection */
export default compose(
	connect(mapStateToProps),
	firestoreConnect((ownProps) => [
		{
			collection: 'class',
			orderBy: ['department'],
		},
	])
)(Courses);
