import React from 'react';
import { Link } from 'react-router-dom';

/** Card Displaying Study Groups Information
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupCard({ id, key, department, number, term, title }) {
	return (
		<>
			<Link to={`/studygroup/${id}`} className='mate-text-secondary'>
				<table key={key} className='mate-table table-hover'>
					<tbody className='Course Course-Card'>
						<tr>
							<td className='mate-text-primary Course-Name'>
								{title}

								{/* {`${department} ${number}`} <br />
								<span className='mate-text-secondary Course-Card-Term pt-1 pb-2'>
									{term}
								</span> */}
							</td>
							{/* <td className='pl-3 Course-Title'>{title}</td> */}
						</tr>
					</tbody>
				</table>
			</Link>
		</>
	);
}

export default StudyGroupCard;
