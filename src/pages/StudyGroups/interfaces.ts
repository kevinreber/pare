interface UserTypes {
	uid: string;
	displayName: string;
	photoURL: string;
	admin?: boolean;
}

interface StudyGroupDataTypes {
	title: string;
	description: string;
	usersList: UserTypes[];
	private: boolean;
}
interface StudyGroupTypes {
	id: string;
	data: StudyGroupDataTypes;
}

export interface StudyGroupsTypes {
	studyGroups: StudyGroupTypes[];
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
