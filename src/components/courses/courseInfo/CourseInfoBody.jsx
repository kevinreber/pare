import React, { useState } from 'react';
import CourseAssignmentList from './CourseAssignmentList';

/** Displays Body information of Course Info Page */
function CourseInfoHeader({ course }) {
	// State will determine what courses to show in CourseList
	const [active, setActive] = useState('assignments');
	const toggleCourses = (e) => {
		setActive(e.target.id);
	};

	return (
		<div className='Course-Info-Body'>
			<div className='Courses-Header d-flex justify-content-around pt-3 pb-1'>
				<div className='Course-Info-Assignments Course-Info-Title'>
					<p
						id='assignments'
						className={
							active === 'assignments'
								? 'mate-text-primary'
								: 'mate-text-active'
						}
						onClick={toggleCourses}>
						Assignments
					</p>
				</div>
				<div className='Course-Info-Discussions Course-Info-Title'>
					<p
						id='discussions'
						className={
							active === 'discussions'
								? 'mate-text-primary'
								: 'mate-text-active'
						}
						onClick={toggleCourses}>
						Discussions
					</p>
				</div>
			</div>
			<div className='Course-Info-Body-List'>
				<CourseAssignmentList />
			</div>
		</div>
	);
}

export default CourseInfoHeader;
