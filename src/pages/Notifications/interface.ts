import { ChangeEvent } from 'react';

export interface NewMessageFormProps {
	send: Function;
	receiverId?: null;
	content?: string;
	showAllUsers?: boolean;
}

export interface NewMessage {
	uid: string;
	users: string[];
	count: number;
	createdAt: Date;
	lastUpdatedAt: Date;
	chats: [];
}

export interface NewChat {
	content: string;
	uid: string;
	createdAt: Date;
}

export interface ChatReceiver {
	uid: string;
	displayName: string;
	photoURL: string;
}

export interface UserProps {
	id: string;
}

export interface OnChangeProps {
	e?: ChangeEvent<HTMLInputElement> | undefined;
	data?: { displayName: string; photoURL: string } | undefined;
}

export interface AutoCompleteUsersProps {
	id: string;
	onChange: Function;
	name: string;
	value: string;
	placeholder: string;
	setId: Function;
	showOptions: boolean;
	toggleOptions: Function;
	receiver: ChatReceiver;
	receiverChosen: boolean;
	clearData: Function;
	allUsers: boolean;
}

export interface MessageListProps {
	messages: any[];
	userId: string;
	toggleForm: Function;
}

export interface MessageCardProps {
	message: any;
	userId: string;
}

interface ChatProps {
	content: string;
	createdAt: Date;
	uid: string;
}
export interface ChatsProps {
	chats: ChatProps[];
}
