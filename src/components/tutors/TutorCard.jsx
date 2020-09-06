/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

function TutorCard({ id, key, name, avatar, tutorSubjects, classes }) {
	return (
		<>
			<Link to={`/users/${id}`}>
				<div key={key} className='mate-table table-hover'>
					<div className='Tutor Tutor-Card'>
						<div className='mr-3'>
							<img
								src={avatar}
								alt={name}
								className='Tutor Tutor-Avatar Avatar'
							/>
						</div>
						<div className='mate-text-primary text-left mr-auto'>
							{name} <br />
							<span className='mate-text-secondary Tutor-Card-Term'>
								{classes}
							</span>
						</div>
						<div className='Tutor-Title mate-text-secondary text-left'>
							{tutorSubjects}
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}

export default TutorCard;
