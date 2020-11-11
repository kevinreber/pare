import React from 'react';
import { render } from '@testing-library/react';
import UserProfileHeader from './UserProfileHeader';

describe('UserProfileHeader Component', () => {
	test('should render without crashing', () => {
		render(
			<UserProfileHeader
				id="12345"
				displayName="Jon Smith"
				name="Jon"
				school="U.C. Berkeley"
				avatar="https://academist-app-production.s3.amazonaws.com/uploads/user/profile_image/11332/default_user_icon.png"
			/>
		);
	});
});
