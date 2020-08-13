import React from 'react';
import { useParams } from 'react-router-dom';
import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoBody from './CourseInfoBody';
import './styles/CourseInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Courses -> CourseList -> Course -> CourseInfo
 */
function CourseInfo() {
	const { courseId } = useParams();

	return (
		<>
			<CourseInfoHeader course={courseId} />
			<CourseInfoBody course={courseId} />
		</>
	);
}

export default CourseInfo;
