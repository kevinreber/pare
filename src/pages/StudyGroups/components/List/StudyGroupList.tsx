/** Dependencies */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

/** MUI */
import { List } from '@material-ui/core';

import { StudyGroupsTypes } from '../../interfaces';

/** Creates a List of User's StudyGroups
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 *
 * @param {array}    studyGroups	Array of objects containing Study Group data.
 */
const StudyGroupList = ({ studyGroups = [] }: StudyGroupsTypes) => {
	/** Card Displaying Study Groups Information */
	const groupList = studyGroups.map((studyGroup) => (
		<div key={studyGroup.id} className="StudyGroups__Card">
			<Link to={`/study-groups/${studyGroup.id}`}>
				<table key={studyGroup.id} className="table-hover StudyGroups__table">
					<tbody>
						<tr>
							<td className="mate-text-secondary Course-Name">
								{studyGroup.data.title}
							</td>
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
};

StudyGroupList.propTypes = {
	studyGroups: PropTypes.array,
};

export default memo(StudyGroupList);
