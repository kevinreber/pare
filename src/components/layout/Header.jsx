/** Dependencies */
import React, { useState } from 'react';
import Logo from '../../images/logo/mate-logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/actions/auth';

/** Material UI */
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	AppBar,
	Toolbar,
	Badge,
} from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

/** Stylesheets */
import './styles/Header.css';

/** Styles for SideBar Drawer */
const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

function Header() {
	const dispatch = useDispatch();

	const logOutUser = () => {
		dispatch(logOut());
	};

	const currentUser = useSelector((state) => state.auth.user);
	console.log(currentUser);
	/** Initialize useStyles */
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);

	/** Toggles SideBar Drawer */
	const toggleDrawer = (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setDrawer((state) => !state);
	};

	/** SideBar Drawer
	 * must leave 'anchor' or else SideBar breaks
	 */
	const SideBar = (anchor) => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}>
			<List>
				<ListItem>
					<ListItemIcon>
						<Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
					</ListItemIcon>
					<ListItemText primary='Tony Stark' />
				</ListItem>
			</List>
			<List>
				<ListItem>
					<Link to='/following'>
						<ListItemIcon>
							<GroupAddIcon />
						</ListItemIcon>
						<ListItemText primary='Following' />
					</Link>
				</ListItem>
				<ListItem>
					<Link to={`/users/${currentUser.uid}`}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary='Profile' />
					</Link>
				</ListItem>
				<ListItem>
					<Link to='#'>
						<ListItemIcon>
							<BookmarkIcon />
						</ListItemIcon>
						<ListItemText primary='Bookmarks' />
					</Link>
				</ListItem>
			</List>
			<List>
				<ListItem>
					<ListItemIcon>
						<ExitToAppOutlinedIcon />
					</ListItemIcon>
					<ListItemText onClick={logOutUser} primary={'Logout'} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className='Header'>
			<AppBar position='static' className='Header-Content'>
				<Toolbar>
					<IconButton onClick={toggleDrawer}>
						<Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
					</IconButton>
					<Drawer anchor={'left'} open={drawer} onClose={toggleDrawer}>
						{SideBar('left')}
					</Drawer>
					<div className='Header-Logo'>
						<img src={Logo} alt='Mate' />
					</div>
					<IconButton>
						<Link to='/notifications'>
							{/* <NotifyIcon /> */}
							<Badge badgeContent={4}>
								<NotificationsNoneOutlinedIcon style={{ fontSize: 45 }} />
							</Badge>
						</Link>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
