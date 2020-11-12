/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import CourseCard from '../CourseCard/CourseCard';

/** Creates a List of User's Courses
 * Courses -> CourseList -> CourseCard -> CourseInfo
 *
 * @param {array}	 courses	 Array of objects containing course data.
 */
function CourseList({ courses = [] }) {
	const List = courses.map((course) => (
		<>
			<li key={course.id}>
				<CourseCard
					id={course.id}
					department={course.data.course.abbreviation}
					number={course.data.course.course_number}
					term={course.data.semester}
					title={course.data.course.title}
				/>
			</li>
		</>
	));

	return <ul className="Course-List">{List}</ul>;
}

CourseList.propTypes = {
	courses: PropTypes.array,
};

export default CourseList;
