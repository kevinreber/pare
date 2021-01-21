import React, { useState, memo } from 'react';
import CourseDetails from '../Details/CourseDetails';

interface Props {
	course: any;
	semester: string;
	sections: any;
	title: string;
	removeCourse: Function;
}

/** Displays Header information of Course Info Page
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseDetails && CourseOverallGrades
 */
const CourseInfoHeader = ({
	course,
	semester,
	sections,
	title,
	removeCourse,
}: Props): JSX.Element => {
	const [showCourseDetails, setShowCourseDetails] = useState(false);

	const toggleShowCourseDetails = () => setShowCourseDetails((show) => !show);

	if (showCourseDetails) {
		return (
			<CourseDetails
				course={course}
				title={title}
				show={showCourseDetails}
				toggle={toggleShowCourseDetails}
				removeCourse={removeCourse}
			/>
		);
	}

	return (
		<>
			<h5 className="CourseInfoTitle">{title}</h5>
			<p className="mate-text-secondary Course-Card-Term">{semester}</p>
			<i
				onClick={toggleShowCourseDetails}
				className="mate-more-info fas fa-info-circle"></i>
		</>
	);
};

export default memo(CourseInfoHeader);
