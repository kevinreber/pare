/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

/** MUI */
import Avatar from '@material-ui/core/Avatar';

function UserAvatar(uid, src, alt) {
	return (
		<>
			<Link to={`/users/${uid}`}>
				<Avatar src={src} alt={alt} />
			</Link>
		</>
	);
}

export default UserAvatar;
