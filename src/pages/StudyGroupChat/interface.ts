interface UserTypes {
	uid: string;
	displayName: string;
}

interface MemberDataTypes {
	uid: string;
	displayName: string;
	photoURL: string;
	admin: boolean;
}

interface MemberTypes {
	id: string;
	data: MemberDataTypes;
}

export interface FormDataTypes {
	uid: string;
	message: string;
	createdAt: Date;
	displayName: string;
}

export interface ChatFooterTypes {
	send: Function;
	user: UserTypes;
}

export interface ChatAdminTypes {
	studyGroupId: string;
	title: string;
	members: MemberTypes[];
	currentUser: { uid: string };
	handleChange: Function;
	saveChanges: Function;
}
