/** Dependencies */
import React from 'react';

/** MUI */
import SearchIcon from '@material-ui/icons/Search';

function Searchbar({ value, setValue }) {
	return (
		<div className='Search__Elements'>
			<div className='Search__Icon'>
				<SearchIcon />
			</div>
			<input
				id='search'
				className='form-control mate-form-input'
				type='search'
				onChange={(e) => setValue(e.target.value)}
				name='search'
				value={value}
				maxLength='30'
				placeholder='Search...'
			/>
		</div>
	);
}

export default Searchbar;
