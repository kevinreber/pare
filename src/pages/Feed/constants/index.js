/** Initial State for Image attachments */
export const INITIAL_STATE_IMAGE = {
	attachment_preview: '',
	attachment: '',
	name: '',
	url: '',
};

/** Post Type options */
export const postTypeOptions = [
	'Networking',
	'Campus',
	'Opportunities',
	'Marketplace',
	'Events',
];

/** Firebase Collection constants  */
export const FB = {
	collection: 'feeds',
	orderBy: 'timestamp',
	order: 'desc',
};

/** Message types */
export const MESSAGE = {
	error: 'error',
	success: 'success',
	addPost: 'Post Successful!',
	deletePost: 'Removed Post',
	updatePost: 'Update Successful!',
};

/** Confirm Dialog prompts */
export const CONFIRM = {
	title: 'Are you sure you want to remove post?',
	subtitle: "You can't undo this operation",
};
