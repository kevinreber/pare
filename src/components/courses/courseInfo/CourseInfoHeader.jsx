import React, { useState, useEffect } from 'react';
import BackButton from '../../general/BackButton';
import CourseDetails from './CourseDetails';
import CourseOverallGrades from './CourseOverallGrades';
import Modal from '../../general/Modal';
import db from '../../../config/fbConfig';

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
		<div className='CourseInfoHeader'>
			<BackButton />
			<div className='CourseInfoHeaderTitle d-flex justify-content-around pt-1'>
				<div className='Course-Id mr-4 text-left'>
					<h5 className='CourseInfoTitle'>
						{title}
						<i
							onClick={toggleShowCourseDetails}
							className='mate-more-info fas fa-info-circle'></i>
					</h5>
					<span className='mate-text-secondary Course-Card-Term'>
						{semester}
					</span>
				</div>
				<div className='CourseOverallGrade mr-4'>
					<CourseOverallGrades course={course} />
				</div>
			</div>
		</div>
	);
}

export default CourseInfoHeader;
