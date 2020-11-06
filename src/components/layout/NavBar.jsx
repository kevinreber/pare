/** Dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';

/** Components */
import { ReactComponent as CoursesIcon } from './icons/courses-icon.svg';
import StudyGroupIcon from './icons/study-group-icon.png';
import { ReactComponent as TutorIcon } from './icons/tutor-icon.svg';

/** MUI */
// import IconButton from '@material-ui/core/IconButton';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Badge } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';

import './styles/NavBar.css';

function NavBar() {
	return (
		<nav className="NavBar fixed-bottom mate-bg-primary">
			<ul className="NavBar-List">
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/feed">
						<HomeOutlinedIcon style={{ fontSize: 45 }} />
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/search">
						<SearchOutlinedIcon style={{ fontSize: 45 }} />
					</NavLink>
				</li>
				<li className="nav-item p-0">
					<NavLink className="nav-link mate-text-primary" to="/courses">
						<CoursesIcon />
					</NavLink>
				</li>
				<li className="nav-item p-0">
					<NavLink className="nav-link mate-text-primary" to="/study-groups">
						<img
							className="study-group-icon"
							src={StudyGroupIcon}
							alt="Study Group"
						/>
					</NavLink>
				</li>
				<li className="nav-item p-0">
					<NavLink className="nav-link mate-text-primary" to="/tutors">
						<TutorIcon />
					</NavLink>
				</li>
				<li className="nav-item p-0 hide-sm">
					<NavLink className="nav-link mate-text-primary" to="/notifications">
						<Badge badgeContent={4}>
							<NotificationsNoneOutlinedIcon style={{ fontSize: 45 }} />
						</Badge>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
