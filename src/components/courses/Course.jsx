import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying course information
 * Courses -> CourseList -> Course -> CourseInfo
 */
function Course({ course }) {
	return (
		<>
			<tr className='Course Course-Card'>
				<th
					className='mate-text-primary pt-1 pb-1 pl-4 pr-3 text-left'
					scope='row'>
					{`${course.department} ${course.number}`}
				</th>
				<td className='mate-text-secondary pt-1 pb-1 pl-1 text-left'>
					<Link to={`/courses/${course.id}`} className='mate-text-secondary'>
						{course.name}
					</Link>
				</td>
				<td className='mate-text-secondary font-italic Course-Term pt-1 pb-1'>
					{course.term}
				</td>
			</tr>
		</>
	);
}

export default Course;
