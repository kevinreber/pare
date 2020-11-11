import React from 'react';
import { render } from '@testing-library/react';
import NoData from './NoData';

describe('NoData Component', () => {
	test('should render with "added"', () => {
		render(<NoData text="Data" added={true} />);
		const pTag = document.querySelector('p');
		expect(pTag.textContent).toBe('No Data added');
	});

	test('should not render with "added"', () => {
		render(<NoData text="Data" added={false} />);
		const pTag = document.querySelector('p');
		expect(pTag.textContent).toBe('No Data ');
	});
});
