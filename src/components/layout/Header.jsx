import React, { useState } from 'react';
import Logo from '../../images/logo/mate-logo.png';
import { ReactComponent as NotifyIcon } from './icons/notification-icon.svg';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import UserAvatar from '../user/UserAvatar';
import Avatar from '@material-ui/core/Avatar';
import './styles/Header.css';

/** Temp Dummy Code */
import DummyAvatar from '../../images/temp/avatar.jpg';
/************************************************** */

/** Styles for SideBar Drawer */
const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

function Header() {
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
						<Avatar alt='Tony' src={DummyAvatar} />
					</ListItemIcon>
					<ListItemText primary='Tony Stark' />
				</ListItem>
			</List>
			<List>
				<ListItem>
					<ListItemIcon>
						<GroupAddIcon />
					</ListItemIcon>
					<ListItemText primary='Following' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText primary='Profile' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<BookmarkIcon />
					</ListItemIcon>
					<ListItemText primary='Bookmarks' />
				</ListItem>
			</List>
			<List>
				<ListItem>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary={'Logout'} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className='Header container'>
			<div className='Header-Content d-flex justify-content-between mt-5 mb-4'>
				<div className='Header-Avatar mt-auto mb-auto'>
					<React.Fragment key={'left'}>
						<IconButton onClick={toggleDrawer}>
							<UserAvatar />
						</IconButton>
						<Drawer anchor={'left'} open={drawer} onClose={toggleDrawer}>
							{SideBar('left')}
						</Drawer>
					</React.Fragment>
				</div>
				<div className='Header-Logo mt-auto mb-auto'>
					<img src={Logo} alt='Mate' />
				</div>
				<div className='Header-Notif mt-auto mb-auto'>
					{/* <NotifyIcon /> */}
					<IconButton>
						<NotificationsNoneOutlinedIcon style={{ fontSize: 45 }} />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

export default Header;
