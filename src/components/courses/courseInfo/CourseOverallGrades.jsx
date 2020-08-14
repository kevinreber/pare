import React from 'react';

/** Displays Course Overall Grades
 * Courses -> CourseList -> Course -> CourseInfo -> CourseInfoHeader -> CourseOverallGrades
 */
function CourseOverallGrades({ course }) {
	return (
		<>
			<h5 className='OverallGrading mate-text-secondary'>Overall Grading</h5>
			<div className='OverAllCourseGrades'>
				<table className='CourseGradesTable m-auto'>
					<tbody>
						<tr>
							<th>Class</th>
							<td>75%</td>
						</tr>
						<tr>
							<th>You</th>
							<td>77%</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}

export default CourseOverallGrades;
