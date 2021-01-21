interface CommentTypes {
	avatar: string;
	createdAt: Date;
	message: string;
	userId: string;
	username: string;
}

export interface PostDataTypes {
	title: string;
	username: string;
	userId: string;
	avatar: string;
	description: string;
	location?: string;
	type?: string;
	start?: Date;
	end?: Date;
	attachment_preview?: string;
	attachment?: string;
	attachment_name?: string;
	timestamp: Date;
	last_updated: Date;
	num_of_comments: number | undefined;
}

export interface PostTypes {
	id: string;
	title: string;
	data: PostDataTypes;
}

export interface PostCardTypes {
	id: string;
	title: string;
	username: string;
	userId: string;
	avatar: string;
	description: string;
	location?: { address: string } | null;
	type?: string | null;
	start?: Date | null;
	end?: Date | null;
	attachment_preview?: string | null;
	attachment?: string;
	attachment_name?: string;
	timestamp: Date;
	last_updated: Date | null;
	comments: number | null;
	isBookmarked: boolean;
	remove: Function;
	edit: Function;
}

export interface FeedListTypes {
	posts: PostTypes[] | [];
	remove: Function;
	edit: Function;
}

export interface ChatTypes {
	content: string;
	uid: string;
	createdAt: Date;
}

export interface MessageTypes {
	uid: string;
	users: string[];
	count: number;
	createdAt: Date;
	lastUpdatedAt: Date;
	chats: [];
}
