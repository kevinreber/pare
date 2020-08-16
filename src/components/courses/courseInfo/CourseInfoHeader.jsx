import React, { useState } from 'react';
import BackButton from '../../general/BackButton';
import CourseDetails from './CourseDetails';
import CourseOverallGrades from './CourseOverallGrades';
import Modal from '../../general/Modal';

/** Displays Header information of Course Info Page
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseDetails && CourseOverallGrades
 */
function CourseInfoHeader({ course }) {
	const [showCourseDetails, setShowCourseDetails] = useState(false);

	const toggleShowCourseDetails = () => setShowCourseDetails((show) => !show);

	if (showCourseDetails) {
		return (
			<Modal
				content={<CourseDetails course={course} />}
				closeModal={toggleShowCourseDetails}
			/>
		);
	}

	return (
		<div className='CourseInfoHeader'>
			<BackButton url={'/courses'} />
			<div className='CourseInfoHeaderTitle d-flex justify-content-around pt-1'>
				<div className='Course-Id mr-4 text-left'>
					<h5 className='CourseInfoTitle'>
						CS61A
						<i
							onClick={toggleShowCourseDetails}
							className='mate-more-info fas fa-info-circle'></i>
					</h5>
					<span className='mate-text-secondary Course-Card-Term'>
						FALL 2020
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
