/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase';

/** Components & Helpers */
import CourseInfoHeader from './components/CourseInfoHeader/CourseInfoHeader';
import CourseAssignmentList from '../../components/CourseAssignments/CourseAssignmentList';
import AssignmentForm from '../../components/CourseAssignments/AssignmentForm';
import BackButton from '../../components/BackButton/BackButton';
import CTAButton from '../../components/CTAButton/CTAButton';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';
import './CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const [course, setCourse] = useState(null);
	const [assignments, setAssignments] = useState([]);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const currentUser = useSelector((state) => state.auth.user);

	const addAssignment = (assignmentData) => {
		db.collection('courses')
			.doc(courseId)
			.collection('assignments')
			.add(assignmentData);

		/** Prompt user added assignment */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Added assignment!',
				type: 'success',
			})
		);
		setShowForm(false);
	};

	/** Remove user from course users list */
	const removeCourse = () => {
		db.collection('courses')
			.doc(courseId)
			.update({
				users: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
			});
		// redirect user
		history.push('/courses');

		/** Prompt user left course */
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Removed Course',
				type: 'error',
			})
		);
	};

	// get course assignments
	useEffect(() => {
		if (courseId && isLoading) {
			db.collection('courses')
				.doc(courseId)
				.onSnapshot((snapshot) => setCourse(snapshot.data()));
		}

		if (course && isLoading) {
			db.collection('courses')
				.doc(courseId)
				.collection('assignments')
				.orderBy('dueDate', 'asc')
				.onSnapshot((snapshot) =>
					setAssignments(
						snapshot.docs.map((doc) => {
							return {
								id: doc.id,
								data: doc.data(),
							};
						})
					)
				);
			setIsLoading(false);
		}
	}, [courseId, course, isLoading]);

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={
					<AssignmentForm save={addAssignment} userId={currentUser.uid} />
				}
				closeModal={toggleForm}
			/>
		);
	}

	const courseInfo =
		!isLoading && course ? (
			<div className="CourseInfo">
				<div className="CourseInfo__Header">
					<BackButton />
					<CourseInfoHeader
						course={course}
						semester={course.semester}
						sections={course.sections}
						title={`${course.course.abbreviation} ${course.course.course_number}`}
						removeCourse={removeCourse}
					/>
				</div>
				<div className="CourseInfo__Body">
					<CourseAssignmentList assignments={assignments} />
				</div>
				<div className="AssignmentForm p-3">
					<div onClick={toggleForm} className="font-italic">
						<CTAButton text="Add Assignment" />
					</div>
				</div>
			</div>
		) : (
			<Loader />
		);

	return <>{courseInfo}</>;
}

export default CourseInfo;
