/** Initial State for Notify */
export const INITIAL_STATE_NOTIFY = {
	isOpen: false,
	message: '',
	type: '',
};

/** Initial State for Confirm Dialog */
export const INITIAL_STATE_CONFIRM_DIALOG = {
	isOpen: false,
	title: '',
	subtitle: '',
};

/** Firebase Collection constants  */
export const FB = {
	collection: 'feeds',
	subCollection: 'comments',
	orderBy: 'createdAt',
	order: 'desc',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addPost: 'Post Successful!',
	deleteComment: 'Removed Comment',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove this comment?',
	subtitle: "You can't undo this operation",
};
