/** Dependencies */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import Logo from '../../images/logo/pare-logo.png';
import { logOut } from '../../store/actions/auth';

/** MUI */
import { IconButton, Avatar } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SchoolIcon from '@material-ui/icons/School';

import './styles/NavBar.css';

function NavBar() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.auth.user);

	const logOutUser = () => {
		dispatch(logOut());
	};

	return (
		<nav className="NavBar fixed-bottom mate-bg-primary">
			<ul className="NavBar-List NavBar-List__Secondary NavBar-List__Logo hide-sm">
				<li className="nav-item p-0">
					<div className="Header-Logo">
						<Link to="/feed">
							<img src={Logo} alt="Mate" />
						</Link>
					</div>
				</li>
			</ul>
			<ul className="NavBar-List NavBar-List__Primary">
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/feed">
						<HomeOutlinedIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Home</h5>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/search">
						<SearchOutlinedIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Search</h5>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/courses">
						<SchoolIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Courses</h5>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						className="nav-link mate-text-primary Study-Group-Nav"
						to="/study-groups">
						<GroupWorkIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Study Groups</h5>
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link mate-text-primary" to="/tutors">
						<GroupAddIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Tutors</h5>
					</NavLink>
				</li>
				<li className="nav-item p-0 hide-sm">
					<NavLink className="nav-link mate-text-primary" to="/messages">
						<MailOutlineIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Messages</h5>
					</NavLink>
				</li>
			</ul>
			<ul className="NavBar-List NavBar-List__Secondary NavBar-List__Settings hide-sm">
				<li className="nav-item p-0 Log-Out">
					<IconButton onClick={logOutUser}>
						<ExitToAppOutlinedIcon style={{ fontSize: 45 }} />
						<h5 className="hide-lg">Sign Out</h5>
					</IconButton>
				</li>
				<li className="nav-item p-0 nav-avatar">
					<Link to={`/users/${currentUser.uid}`}>
						<Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
						<h5 className="hide-lg">{currentUser.displayName}</h5>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
