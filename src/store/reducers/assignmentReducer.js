const INITIAL_STATE = [
	{
		id: 1,
		title: 'HW 01: Variables & Functions',
		dueDate: 'Today @4pm',
		classGrade: 76,
		userGrade: 80,
		submitStatus: true,
		classSubmittals: 10,
	},
	{
		id: 2,
		title: 'HW 02: Data Abstraction',
		dueDate: 'Tomorrow @7pm',
		classGrade: 76,
		userGrade: 80,
		submitStatus: true,
		classSubmittals: 10,
	},
	{
		id: 3,
		title: 'Project: Hog',
		dueDate: 'July 25,2020 @4pm',
		classGrade: 76,
		userGrade: null,
		submitStatus: true,
		classSubmittals: 10,
	},
	{
		id: 4,
		title: 'HW 02: High-Order functions',
		dueDate: 'Aug. 2,2020 @2:30pm',
		classGrade: 76,
		userGrade: 80,
		submitStatus: true,
		classSubmittals: 10,
	},
];

const assignmentReducer = (state = INITIAL_STATE, action) => {
	return state;
};

export default assignmentReducer;
