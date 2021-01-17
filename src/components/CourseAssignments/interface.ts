export interface GradeProps {
	id: number | null;
}

export interface AssignmentDataProps {
	dueDate: Date;
	title: string;
	grades: GradeProps[];
	type: string;
}

export interface AssignmentProps {
	id: string;
	data: AssignmentDataProps;
}

export interface AssignmentsProps {
	assignments: AssignmentProps[];
}

export interface AssignmentCardProps {
	id: string;
	dueDate: Date;
	title: string;
	grades: GradeProps[];
}
