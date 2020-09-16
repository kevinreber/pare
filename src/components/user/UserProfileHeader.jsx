/** Dependencies */
import React from 'react';

/** Components & Helpers */
import BackButton from '../general/BackButton';

/** Header for User Profile */
function UserProfileHeader({
	id,
	displayName,
	name,
	school,
	avatar,
	// avatar = 'https://academist-app-production.s3.amazonaws.com/uploads/user/profile_image/11332/default_user_icon.png',
	// background = 'https://www.berkeleyside.com/wp-content/uploads/2020/04/1920px-UCBerkeleyCampus-720x468.jpg',
	isTutor = false,
}) {
	const background =
		'https://www.berkeleyside.com/wp-content/uploads/2020/04/1920px-UCBerkeleyCampus-720x468.jpg';

	const headerStyle = {
		backgroundImage: 'url(' + background + ')',
	};

	/**
	 * ! Will check user.id if profile page is bookmarked or being followed
	 * */
	const bookmarkStatus = id ? 'fas fa-bookmark mr-3' : 'far fa-bookmark mr-3';
	const followStatus = id ? 'fas fa-user-plus mr-2' : 'fas fa-user-minus mr-2';

	return (
		<>
			<div
				style={headerStyle}
				className='User-Profile User-Profile-Header-BG Image-Overlay pt-3 pb-3'>
				<BackButton />
				<h5 className='User-Profile-Username mb-3'>
					{displayName}
					{/* {name.first} {name.last} */}
				</h5>
				<img
					className='Avatar User-Profile-Avatar mb-3'
					src={avatar}
					alt={name}
				/>
				<div className='User-Profile-Header-Footer d-flex justify-content-end'>
					<p className='User-Profile-School ml-auto mr-1'>
						<i className='fas fa-map-marker-alt mr-2'></i>
						{school}
					</p>
					<div className='User-Profile-Actions ml-5 mr-3'>
						<i className={bookmarkStatus}></i>
						<i className={followStatus}></i>
						<i className='fas fa-share-alt'></i>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserProfileHeader;
