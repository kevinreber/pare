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
	messages: 'messages',
	chats: 'chats',
	users: 'users',
	orderBy: 'createdAt',
	order: 'asc',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addPost: 'Post Successful!',
	deleteMessage: 'Message Deleted',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove this comment?',
	subtitle: "You can't undo this operation",
};
