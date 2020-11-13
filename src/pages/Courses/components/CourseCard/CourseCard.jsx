/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying course information
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
function CourseCard({ id, department, number, term, title }) {
	return (
		<div className="CourseCard">
			<Link to={`/courses/${id}`} className="mate-text-secondary table-hover">
				<div className="mate-table  Course Course-Card">
					<p className="mate-text-primary Course-Name">
						{`${department} ${number}`} <br />
						<span className="mate-text-secondary Course-Card-Term pt-1 pb-2">
							{term}
						</span>
					</p>
					<p className="pl-3 Course-Title mate-text-secondary">{title}</p>
				</div>
			</Link>
		</div>
	);
}

export default CourseCard;
