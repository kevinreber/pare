import React from 'react';

/** Card displaying course information */
function Course({course}) {
	return (
		<div className="Class Class-Card p-3 d-flex justify-content-between">
			<div className="Class-Card-Content d-flex">
				<p className='mate-text-primary'>{course}</p>
				<p className="ml-auto">Name of class</p>
			</div>
			<div className="Class-Card-Semester">
				<p className="font-italic">Fall 2020</p>
			</div>
		</div>
	);
}

export default Course;