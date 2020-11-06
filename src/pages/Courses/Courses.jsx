/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import Modal from '../../components/general/Modal';
import Loader from '../../components/layout/Loader/Loader';
import NoData from '../../components/general/NoData';
import CTAButton from '../../components/general/CTAButton';
import { addCourseToFB } from '../../store/actions/courses';
import { fetchCourseCatalog } from '../../store/actions/courseCatalog';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';
import './Courses.css';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
function Courses() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);

	const CONFIRM_DIALOG_INITIAL_STATE = {
		isOpen: false,
		title: '',
		subtitle: '',
	};

	/** Get courseCatalog from redux store */
	const courseCatalog = useSelector((state) => state.courseCatalog);

	const [courses, setCourses] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState(
		CONFIRM_DIALOG_INITIAL_STATE
	);

	/** Current Semester courses */
	const currentCourses =
		!isLoading && courses
			? courses.filter(
					(course) => course.data.semester.toLowerCase() === 'fall 2020'
			  )
			: null;

	/** Past Semester Courses */
	const pastCourses =
		!isLoading && courses
			? courses.filter(
					(course) => course.data.semester.toLowerCase() !== 'fall 2020'
			  )
			: null;

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('current');
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	/** Prompts Confirmation Dialog to Delete Post ********/
	const addCoursePrompt = (courseData) => {
		setConfirmDialog({
			isOpen: true,
			title: `Add ${courseData.courseName}?`,
			subtitle: '',
			onConfirm: () => {
				addCourse(courseData);
			},
		});
	};

	const addCourse = (courseData) => {
		dispatch(addCourseToFB(courseData, currentUser.uid));
		setShowForm(false);
		setConfirmDialog(CONFIRM_DIALOG_INITIAL_STATE);
		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Course Added',
				type: 'success',
			})
		);
	};

	useEffect(() => {
		const getData = () => {
			db.collection('class')
				.where('users', 'array-contains', currentUser.uid)
				.onSnapshot((snapshot) =>
					setCourses(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
			setIsLoading(false);
		};
		if (isLoading) {
			getData();
		}
	}, [currentUser, isLoading]);

	useEffect(() => {
		/** get course catalog on page load */
		async function getCourseCatalog() {
			await dispatch(fetchCourseCatalog());
		}
		if (!courseCatalog.courses) {
			getCourseCatalog();
		}
	}, [dispatch, courseCatalog]);

	// build list of courses, if no courses exist return 'No courses added'
	let courseList;
	if (isLoading) {
		courseList = <Loader />;
	} else if (!isLoading) {
		courseList =
			!courses ||
			courses.length === 0 ||
			(active === 'current' && currentCourses.length === 0) ||
			(active === 'past' && pastCourses.length === 0) ? (
				<NoData text={'courses'} />
			) : (
				<CourseList
					courses={active === 'current' ? currentCourses : pastCourses}
				/>
			);
	}

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={
					<CourseForm
						save={addCoursePrompt}
						confirmDialog={confirmDialog}
						setConfirmDialog={setConfirmDialog}
						courses={courses}
					/>
				}
				closeModal={toggleForm}
			/>
		);
	}

	return (
		<div className="Courses">
			<div className="Courses-Header Body-Header">
				<div className="Courses-Current">
					<h5
						id="current"
						className={
							active === 'current' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Current Semester
					</h5>
				</div>
				<div className="Courses-Past">
					<h5
						id="past"
						className={
							active === 'past' ? 'mate-text-primary' : 'mate-text-active'
						}
						onClick={toggleCourses}>
						Past Semester
					</h5>
				</div>
			</div>
			<div className="Courses__CourseList">{courseList}</div>
			<div className="CourseForm p-3">
				<div onClick={toggleForm} className="font-italic">
					<CTAButton text="Join Class" />
				</div>
			</div>
		</div>
	);
}

export default Courses;
