import React from 'react';
import Avatar from '../../images/temp/avatar.jpg';
import './styles/UserAvatar.css';

function UserAvatar(){

    return(
        <>
            <img className='UserAvatar' src={Avatar} alt='User Avatar'/>
        </>
    )
}

export default UserAvatar;