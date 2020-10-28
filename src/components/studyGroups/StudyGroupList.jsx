/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** MUI */
import { List } from '@material-ui/core';

/** Creates a List of User's StudyGroups
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 *
 * @param {array}    studyGroups	Array of objects containing Study Group data.
 */
function StudyGroupList({ studyGroups = [] }) {
	/** Card Displaying Study Groups Information */
	const groupList = studyGroups.map((studyGroup) => (
		<div key={studyGroup.id} className="StudyGroups__Card">
			<Link to={`/study-groups/${studyGroup.id}`}>
				<table key={studyGroup.id} className="table-hover StudyGroups__table">
					<tbody>
						<tr>
							<td className="mate-text-secondary Course-Name">
								{studyGroup.data.title}

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
	));

	return (
		<div className="Course-List">
			<List>{groupList}</List>
		</div>
	);
}

StudyGroupList.propTypes = {
	studyGroups: PropTypes.array,
};

export default StudyGroupList;
