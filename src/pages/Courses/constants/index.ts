export const CONFIRM_DIALOG_INITIAL_STATE = {
	isOpen: false,
	title: '',
	subtitle: '',
};

// Form Data
export const COURSE_FORM_DATA_INITIAL_STATE = {
	courseName: '',
	courseSemester: '',
	courseYear: '',
	courseId: null,
};

/** Firebase Collection constants  */
export const FB = {
	collection: 'courses',
	field: 'users',
	filter: 'array-contains',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addCourse: 'Course Added',
};
