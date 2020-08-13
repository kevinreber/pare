import React from 'react';

/** If grade for assignment is missing, user will see this 'EnterGradeBtn' */
function EnterGradeBtn() {
	return (
		<>
			<button className='btn Enter-Grade-Btn text-light' type='button'>
				Enter Grade<i className='fas fa-edit ml-1'></i>
			</button>
		</>
	);
}

export default EnterGradeBtn;
