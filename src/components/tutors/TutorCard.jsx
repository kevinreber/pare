import React from 'react';
import { Link } from 'react-router-dom';

function TutorCard({ id, key, name, avatar, tutorSubjects, classes }) {
	return (
		<>
			{/* <table key={key} className='mate-table table-hover'>
				<tbody className='Tutor Tutor-Card'>
					<tr>
						<td className='mr-auto'>
							<img
								src={avatar}
								alt={name}
								className='Tutor Tutor-Avatar Avatar'
							/>
						</td>
						<td className='mate-text-primary text-left'>
							{name} <br />
							<span className='mate-text-secondary Tutor-Card-Term'>
								{classes}
							</span>
						</td>
						<td className='Tutor-Title text-left'>{tutorSubjects}</td>
					</tr>
				</tbody>
			</table> */}
			{/* <Link to={`/users/${id}`}> */}
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
					<div className='Tutor-Title text-left'>{tutorSubjects}</div>
				</div>
			</div>
			{/* </Link> */}
		</>
	);
}

export default TutorCard;
