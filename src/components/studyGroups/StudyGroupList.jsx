import React from 'react';
import StudyGroupCard from './StudyGroupCard';

/** Creates a List of User's StudyGroups
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat
 */
function StudyGroupList({ studyGroups = [] }) {
	const List = studyGroups.map((studyGroup) => (
		<StudyGroupCard
			title={studyGroup.data.title}
			id={studyGroup.id}
			key={studyGroup.id}
			// department={course.data.course.abbreviation}
			// number={course.data.course.course_number}
			// term={course.data.semester}
			// title={course.data.course.title}
		/>
	));

	return <div className='Course-List'>{List}</div>;
}

export default StudyGroupList;
