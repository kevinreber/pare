import React, { MouseEvent, memo } from 'react';

interface Props {
	enterGrade: MouseEvent<HTMLButtonElement>;
}

/** If grade for assignment is missing, user will see this 'EnterGradeBtn' */
const EnterGradeBtn = ({ enterGrade }: Props): JSX.Element => {
	return (
		<>
			<button
				onClick={() => enterGrade}
				className="btn Enter-Grade-Btn text-light"
				type="button">
				Enter Grade<i className="fas fa-edit ml-1"></i>
			</button>
		</>
	);
};

export default memo(EnterGradeBtn);
