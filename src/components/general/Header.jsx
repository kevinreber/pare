import React from 'react';
import Logo from '../../images/logo/mate-logo.png';
import { ReactComponent as NotifyIcon } from './icons/notification-icon.svg';
import UserAvatar from '../user/UserAvatar';
import './styles/Header.css';

function Header() {
	return (
		<div className='Header container'>
			<div className='Header-Content d-flex justify-content-between mt-5 mb-4'>
				<div className='Header-Avatar mt-auto mb-auto'>
					<UserAvatar />
				</div>
				<div className='Header-Logo mt-auto mb-auto'>
					<img src={Logo} alt='Mate' />
				</div>
				<div className='Header-Notif mt-auto mb-auto'>
					<NotifyIcon />
				</div>
			</div>
		</div>
	);
}

export default Header;
