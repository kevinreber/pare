import React from 'react';
import Class from './Class';

/** Creates a List of User's Classes
 * Classes -> ClassList -> Class
 */
function ClassList({ classes=[] }) {

	const List = classes.map(course => 
		(
			<Class course={course.name} />
		));
	
	return (
		<>
			{List}
		</>
	);
}

export default ClassList;