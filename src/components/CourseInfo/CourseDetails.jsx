/** Dependencies */
import React from 'react';

/** MUI */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

/** Displays Details
 * Courses -> CourseList -> Course -> CourseInfo -> CourseDetails
 */
function CourseDetails({ course, title, show, toggle, removeCourse}) {
	const instructor = course.ongoing_sections.length > 0 ? course.ongoing_sections[0].instructor : null;
	const lectureDays = course.ongoing_sections.length > 0 ? course.ongoing_sections[0].word_days : null;

	return (
		<div className='CourseDetails'>
			<Dialog onClose={toggle} aria-labelledby="simple-dialog-title" open={show}>
				<DialogTitle>{title}</DialogTitle>
				<ul className='CourseDetailsTable'>
					{instructor ? 
						(
							<li>
								<p className='table-header'>Instructor:</p>
								<p className='table-content'>{instructor}</p>
							</li>
						) : null
					}
					<li>
						<p className='table-header'>Students:</p>
						<p className='table-content'>{course.course.enrolled}</p>
					</li>
					{lectureDays ? 
						(
							<li>
								<p className='table-header'>Lecture:</p>
								<p className='table-content'>
								{lectureDays}
									<br />
									@10am-11am
								</p>
							</li>
						)
						: null
					}
					{/* <tr>
						<th scope='row'>Lab:</th>
						<td>
							Fridays <br />
							@12pm-1pm
						</td>
					</tr> */}
				</ul>
				<DialogActions>
					<Button onClick={removeCourse}>
						Remove Course
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CourseDetails;
