/** Initial State */
export const INITIAL_STATE = {
	title: '',
	members: [],
};

/** Firebase Collection constants  */
export const FB = {
	collection: 'study-groups',
	messages: 'messages',
	users: 'users',
	orderBy: 'createdAt',
	order: 'asc',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	saveChanges: 'Changes Saved',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove post?',
	subtitle: "You can't undo this operation",
};
