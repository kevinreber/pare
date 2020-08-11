import React from 'react';

/** Card displaying course information
 * Classes -> ClassList -> Class
 */
function Course({ course }) {
	return (
		<>
			<tr className='Class Class-Card'>
				<th className='mate-text-primary pt-3 pb-3 pl-4 text-left' scope='row'>
					{course}
				</th>
				<td className='mate-text-secondary pt-3 pb-3'>Name of class</td>
				<td className='mate-text-secondary font-italic pt-3 pb-3'>Fall 2020</td>
			</tr>
		</>
	);
}

export default Course;
