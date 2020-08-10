import React from 'react';
import Class from './Class';

function ClassList({ classes=[] }) {

	const List = classes.map(course => 
		(
			<Class course={course.name} />
		));
	
	return (
		<>
		{/* <h1>Hi</h1> */}
			{List}
		</>
	);
}

export default ClassList;