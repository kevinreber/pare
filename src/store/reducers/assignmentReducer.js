const INITIAL_STATE = [
	{
		id: 1,
		title: 'HW 01: Variables & Functions',
		dueDate: 'Today @4pm',
		userGrade: null,
		submitStatus: true,
	},
	{
		id: 2,
		title: 'HW 02: Data Abstraction',
		dueDate: 'Tomorrow @7pm',
		userGrade: null,
		submitStatus: true,
	},
	{
		id: 3,
		title: 'Project: Hog',
		dueDate: 'July 25,2020 @4pm',
		userGrade: null,
		submitStatus: true,
	},
	{
		id: 4,
		title: 'HW 02: High-Order functions',
		dueDate: 'Aug. 2,2020 @2:30pm',
		userGrade: null,
		submitStatus: false,
	},
];

const assignmentReducer = (state = INITIAL_STATE, action) => {
	return state;
};

export default assignmentReducer;
