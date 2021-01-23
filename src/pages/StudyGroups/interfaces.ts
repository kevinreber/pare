interface UserTypes {
	uid: string;
	displayName: string;
	photoURL: string;
	admin?: boolean;
}

interface StudyGroupTypes {
	title: string;
	description: string;
	usersList: UserTypes[];
	private: boolean;
}

export interface StudyGroupsTypes {
	id: string;
	data: StudyGroupTypes[];
}

export interface StudyGroupFormTypes {
	save: Function;
	studyGroups: [];
	user: UserTypes;
}

export interface FormDataTypes {
	active: boolean;
	private: boolean;
	admin: string[];
	usersList: string[];
	count: number;
	maxUsers: any;
	title: string;
	createdAt: any;
	lastUpdatedAt: any;
}

export interface SearchTypes {
	studyGroupId: string;
	studyGroupTitle: string;
}
