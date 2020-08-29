import React from 'react';
import { Link } from 'react-router-dom';

/** Card Displaying Study Groups Information
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupCard({ id, key, department, number, term, title }) {
	return (
		<div className='StudyGroups__Card'>
			<Link to={`/study-groups/${id}`}>
				<table key={key} className='table-hover StudyGroups__table'>
					<tbody>
						<tr>
							<td className='mate-text-secondary Course-Name'>
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
		</div>
	);
}

export default StudyGroupCard;
