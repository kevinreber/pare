import { useState } from 'react';

/** useFields handles the state of the form data */
function useFields(INITIAL_STATE) {
	const [formData, setFormData] = useState(INITIAL_STATE);

	/** Update state in formData */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const resetFormData = () => setFormData(INITIAL_STATE);

	return [formData, handleChange, resetFormData];
}

export default useFields;
