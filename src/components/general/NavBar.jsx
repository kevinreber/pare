import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as CoursesIcon } from './icons/courses-icon.svg';
import StudyGroupIcon from './icons/study-group-icon.png';
import { ReactComponent as TutorIcon } from './icons/tutor-icon.svg';

import './styles/NavBar.css';

function NavBar() {
	return (
		<nav className='NavBar fixed-bottom d-flex justify-content-around mate-bg-primary'>
			<ul className='d-flex m-auto'>
				<li className='nav-item mt-auto mb-auto p-0'>
					<NavLink className='nav-link mate-text-primary' exact to='/courses'>
						<CoursesIcon />
					</NavLink>
				</li>
				<li className='nav-item mt-auto mb-auto p-0'>
					<NavLink className='nav-link mate-text-primary' exact to='/connect'>
						<img
							className='study-group-icon'
							src={StudyGroupIcon}
							alt='Study Group'
						/>
					</NavLink>
				</li>
				<li className='nav-item mt-auto mb-auto p-0'>
					<NavLink className='nav-link mate-text-primary' exact to='/tutor'>
						<TutorIcon />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
