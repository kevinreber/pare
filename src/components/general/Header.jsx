import React from 'react';
import Logo from '../../images/logo/mate-logo.png';
import { ReactComponent as NotifyLogo } from './icons/notification-icon.svg';
import UserAvatar from '../user/UserAvatar';
import './Header.css';

function Header() {
	return (
		<div className="Header container mb-3">
		    <div className="Header-Content d-flex justify-content-between mt-5 mb-4">
                <div className="Header-Avatar mt-auto mb-auto">
                    <UserAvatar />
                </div>
                <div className="Header-Logo mt-auto mb-auto">
                    <img src={Logo} />
                </div>            
                <div className="Header-Notif mt-auto mb-auto">
                    <NotifyLogo />
                </div>
		    </div>
		</div>
	);
}

export default Header;