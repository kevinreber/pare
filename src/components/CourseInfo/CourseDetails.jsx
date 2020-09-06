import React from 'react';

/** Displays Details
 * Courses -> CourseList -> Course -> CourseInfo -> CourseDetails
 */
function CourseDetails({ course, title }) {
	return (
		<div className='CourseDetails'>
			<h4>{title}</h4>
			<table className='CourseDetailsTable'>
				<tbody>
					<tr>
						<th>Instructor:</th>
						<td>John Denero</td>
					</tr>
					<tr>
						<th>Students:</th>
						<td>800</td>
					</tr>
					<tr>
						<th scope='row'>Lecture:</th>
						<td>
							M, T, W, Th
							<br />
							@10am-11am
						</td>
					</tr>
					<tr>
						<th scope='row'>Lab:</th>
						<td>
							Fridays <br />
							@12pm-1pm
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default CourseDetails;
