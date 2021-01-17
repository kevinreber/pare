/** Dependencies */
import React, { MouseEvent } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import useFields from '../../hooks/useFields';

interface Props {
	assignmentName: string;
	userGrade: number;
	save: Function;
}

const EditGradeForm = ({
	assignmentName,
	userGrade = 0,
	save,
}: Props): JSX.Element => {
	const INITIAL_STATE = {
		userGrade: userGrade,
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		// Convert userGrade to integer
		save(+formData.userGrade);

		// Clear state of form
		resetFormData();
	};

	return (
		<div className="Enter-Grade-Form p-3">
			<h4 className="mb-5">{assignmentName}</h4>
			{/* @ts-ignore */}
			<form onSubmit={handleSubmit} className="container">
				<div className="form-group">
					<label htmlFor="userGrade" className="float-left">
						Enter Grade
					</label>
					<input
						id="userGrade"
						name="userGrade"
						className="form-control mate-form-input"
						onChange={handleChange}
						value={formData.userGrade}
						type="number"
						min="0"
						max="100"
					/>
				</div>
				<SubmitButton text="Save" />
			</form>
		</div>
	);
};

export default EditGradeForm;
