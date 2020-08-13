import React from 'react';

/** Shows user's grade and button to edit grade */
function UserGrade({ grade }) {
	return (
		<>
			Your Grade: {grade}%
			<div className='Change-Grade'>
				<i className='fas fa-edit'></i>
			</div>
		</>
	);
}

export default UserGrade;
