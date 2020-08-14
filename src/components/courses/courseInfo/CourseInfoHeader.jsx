import React from 'react';
import BackButton from '../../general/BackButton';
import CourseDetails from './CourseDetails';
import CourseOverallGrades from './CourseOverallGrades';

/** Displays Header information of Course Info Page
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseDetails && CourseOverallGrades
 */
function CourseInfoHeader({ course }) {
	return (
		<div className='CourseInfoHeader'>
			<BackButton url={'/courses'} />
			<div className='CourseInfoHeaderTitle d-flex justify-content-around pt-1 mb-3'>
				<div className='Course-Id mr-4'>
					<h5>{course}</h5>
				</div>
				<div className='Course-Title text-left'>
					<p className='mate-text-primary w-75 mb-0'>
						Structure and Interpretation of Computer Programs
					</p>
					<small>FALL 2020</small>
				</div>
			</div>
			<div className='CourseInfoBody d-flex justify-content-between'>
				<div className='CourseDetails'>
					<CourseDetails course={course} />
				</div>
				<div className='CourseOverallGrade mr-4'>
					<CourseOverallGrades course={course} />
				</div>
			</div>
		</div>
	);
}

export default CourseInfoHeader;
