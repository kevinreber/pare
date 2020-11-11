import React from 'react';
import { render } from '@testing-library/react';
import UserEditProfileForm from './UserEditProfileForm';

describe('UserEditProfileForm Component', () => {
	const mockSave = () => console.log('saving...');
	const mockDelete = () => console.log('deleting...');

	test('should render without crashing', () => {
		render(
			<UserEditProfileForm
				bio={'Hello World!'}
				save={mockSave}
				deleteAccount={mockDelete}
			/>
		);
	});
});
