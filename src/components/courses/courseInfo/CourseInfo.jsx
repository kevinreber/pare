import React from 'react';
import { useParams } from 'react-router-dom';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoBody from './CourseInfoBody';
import { useSelector, useDispatch } from 'react-redux';
import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();

	// get course assignments
	const assignments = useSelector(
		(state) =>
			state.courses.filter((course) => course.id === courseId)[0].assignments
	);

	return (
		<>
			<CourseInfoHeader course={courseId} />
			<CourseInfoBody assignments={assignments} />
		</>
	);
}

export default CourseInfo;
