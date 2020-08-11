import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying course information
 * Courses -> CourseList -> Course -> CourseInfo
 */
function Course({ course }) {
	return (
		<>
			{/* <Link to={`/${course.id}`}> */}
			<tr className='Course Course-Card'>
				<th className='mate-text-primary pt-3 pb-3 pl-4 text-left' scope='row'>
					{course.id}
				</th>
				<td className='mate-text-secondary pt-3 pb-3'>
					<Link to={`/courses/${course.id}`} className='mate-text-secondary'>
						{course.description}
					</Link>
				</td>
				<td className='mate-text-secondary font-italic pt-3 pb-3'>
					{course.semester}
				</td>
			</tr>
			{/* </Link> */}
		</>
	);
}

export default Course;
