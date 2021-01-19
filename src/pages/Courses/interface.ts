export interface FormDataProps {
	courseName: string;
	courseSemester: string;
	courseYear: string;
	courseId: string | null;
}

export interface ConfirmDialogProps {
	iOpen: boolean;
	title?: string;
	subtitle?: string;
}

export interface FormProps {
	save: Function;
	confirmDialog: ConfirmDialogProps;
	setConfirmDialog: Function;
	courses: any[];
}
