import React from 'react';
import { render } from '@testing-library/react';
import CTAButton from './CTAButton';

describe('CTAButton Component', () => {
	test('should render without crashing', () => {
		render(<CTAButton text="Submit" danger={false} />);

		const button = document.querySelector('button');
		expect(button.textContent).toBe('Submit');
		expect(button.classList.contains('mate-btn-secondary')).toBe(true);
		expect(button.classList.contains('mate-btn-danger')).toBe(false);
	});
});
