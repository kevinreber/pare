import React from 'react';
import { render } from '@testing-library/react';
import BackButton from './BackButton';

describe('BackButton Component', () => {
	test('should render without crashing', () => {
		render(<BackButton />);
	});
});
