import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying course information
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseCard({ id, key, department, number, term, title }) {
	return (
		<>
			<Link to={`/courses/${id}`} className='mate-text-secondary'>
				<table key={key} className='mate-table table-hover'>
					<tbody className='Course Course-Card'>
						<tr>
							<td className='mate-text-primary Course-Name'>
								{`${department} ${number}`} <br />
								<span className='mate-text-secondary Course-Card-Term pt-1 pb-2'>
									{term}
								</span>
							</td>
							<td className='pl-3 Course-Title mate-text-secondary'>{title}</td>
						</tr>
					</tbody>
				</table>
			</Link>
		</>
	);
}

export default CourseCard;
