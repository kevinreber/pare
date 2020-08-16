import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying course information
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseCard({ course, key }) {
	return (
		<>
			<Link to={`/courses/${course.id}`} className='mate-text-secondary'>
				<table className='mate-table table-hover' id={course.id} key={key}>
					<tbody className='Course Course-Card'>
						<tr>
							<td className='mate-text-primary Course-Name'>
								{`${course.department} ${course.number}`} <br />
								<span className='mate-text-secondary Course-Card-Term pt-1 pb-2'>
									{course.term}
								</span>
							</td>
							<td className='pl-3 Course-Title'>{course.name}</td>
						</tr>
					</tbody>
				</table>
			</Link>
		</>
	);
}

export default CourseCard;
