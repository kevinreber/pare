/** Dependencies */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';

interface Props {
	id: string;
	department: string;
	number: string;
	term: string;
	title: string;
}

/** Card displaying course information
 * Courses -> CourseList -> CourseCard -> CourseInfo
 */
const CourseCard = ({
	id,
	department,
	number,
	term,
	title,
}: Props): JSX.Element => {
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
};

CourseCard.propTypes = {
	id: PropTypes.string.isRequired,
	department: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	term: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default memo(CourseCard);
