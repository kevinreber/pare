/** Dependencies */
import React, { useState, useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import CourseList from './components/CourseList/CourseList';
import CourseForm from './components/CourseForm/CourseForm';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import NoData from '../../components/NoData/NoData';
import CTAButton from '../../components/CTAButton/CTAButton';
import { addCourseToFB } from '../../store/actions/courses';
import { fetchCourseCatalog } from '../../store/actions/courseCatalog';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { CONFIRM_DIALOG_INITIAL_STATE, FB, MESSAGE } from './constants/index';
import db from '../../config/fbConfig';
import { FormDataProps } from './interface';
import './Courses.css';

/** Displays a CourseList of user's Current and Past Semester courses. 
    Courses will fetch which courses to display from API and pass courses into CourseList.
*/
export const Courses = (): JSX.Element => {
	const dispatch = useDispatch();
	// @ts-ignore
	const currentUser = useSelector((state) => state.auth.user);

	/** Get courseCatalog from redux store */
	// @ts-ignore
	const courseCatalog = useSelector((state) => state.courseCatalog);
	const [getCatalog, setGetCatalog] = useState(true);

	const [courses, setCourses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState(
		CONFIRM_DIALOG_INITIAL_STATE
	);

	/** Current Semester courses */
	const currentCourses =
		!isLoading && courses.length > 0
			? courses.filter(
					(course: any) => course.data.semester.toLowerCase() === 'fall 2020'
			  )
			: [];

	/** Past Semester Courses */
	const pastCourses =
		!isLoading && courses.length > 0
			? courses.filter(
					(course: any) => course.data.semester.toLowerCase() !== 'fall 2020'
			  )
			: [];

	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('current');
	const toggleCourses = (e: MouseEvent<HTMLHeadingElement>) => {
		const { id } = e.target as Element;
		setActive(id);
	};

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	/** Prompts Confirmation Dialog to Delete Post ********/
	const addCoursePrompt = (courseData: FormDataProps) => {
		setConfirmDialog({
			isOpen: true,
			title: `Add ${courseData.courseName}?`,
			subtitle: '',
			// @ts-ignore
			onConfirm: () => {
				addCourse(courseData);
			},
		});
	};

	const addCourse = (courseData: FormDataProps) => {
		dispatch(addCourseToFB(courseData, currentUser.uid));
		setShowForm(false);
		setConfirmDialog(CONFIRM_DIALOG_INITIAL_STATE);
		/** Prompt change made */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.addCourse,
				type: MESSAGE.success,
			})
		);
	};

	useEffect(() => {
		const getData = () => {
			db.collection(FB.collection)
				// @ts-ignore
				.where(FB.field, FB.filter, currentUser.uid)
				.onSnapshot((snapshot: any) =>
					setCourses(
						snapshot.docs.map((doc: any) => ({
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
			setGetCatalog(false);
		}
		if (!courseCatalog.courses && getCatalog) {
			getCourseCatalog();
		}
	}, [dispatch, courseCatalog, getCatalog]);

	// build list of courses, if no courses exist return 'No courses added'
	let courseList;
	if (isLoading) {
		courseList = <Loader />;
	} else if (!isLoading) {
		courseList =
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
						// @ts-ignore
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
};
