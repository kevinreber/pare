import React, { useState } from 'react';
import CourseDetails from './CourseDetails';
import CourseOverallGrades from './CourseOverallGrades';
import Modal from '../general/Modal';
import db from '../../config/fbConfig';

/** Displays Header information of Course Info Page
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseDetails && CourseOverallGrades
 */
function CourseInfoHeader({ course, semester, sections, title }) {
	const [showCourseDetails, setShowCourseDetails] = useState(false);

	const toggleShowCourseDetails = () => setShowCourseDetails((show) => !show);

	if (showCourseDetails) {
		return (
			<Modal
				content={<CourseDetails course={course} title={title} />}
				closeModal={toggleShowCourseDetails}
			/>
		);
	}

	return (
		<>
			{/* <div className='CourseInfoHeaderTitle'> */}
			{/* <div className='Course-Id text-left'> */}
			<h5 className='CourseInfoTitle'>{title}</h5>
			<p className='mate-text-secondary Course-Card-Term'>{semester}</p>
			<i
				onClick={toggleShowCourseDetails}
				className='mate-more-info fas fa-info-circle'></i>
			{/* </div> */}
			{/* <div className='CourseOverallGrade mr-4'>
				<CourseOverallGrades course={course} />
			</div> */}
			{/* </div> */}
		</>
	);
}

export default CourseInfoHeader;
