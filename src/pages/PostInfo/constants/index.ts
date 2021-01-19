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
	addComment: 'Comment Successful!',
	deleteComment: 'Removed Comment',
	deletePost: 'Removed Post',
	updatePost: 'Update Successful!',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove this comment?',
	subtitle: "You can't undo this operation",
};

/** Confirm Dialog prompts */
export const CONFIRM_POST = {
	title: 'Are you sure you want to remove post?',
	subtitle: "You can't undo this operation",
};
