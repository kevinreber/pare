const INITIAL_STATE = [
	{
		id: 1,
		name: {
			first: 'Test1',
			last: 'Testing',
		},
		bio: 'I am a test',
		classes: ['CS61A', 'CS61B', 'MATH100A'],
		email: 'test@test.com',
		isTutor: true,
		location: {
			city: 'Berkeley',
			state: 'California',
			country: 'United States',
		},
		organizations: 'Cal Boxing',
		password: '',
		phoneNumber: '(555)555-5555',
		image: 'https://randomuser.me/api/portraits/women/70.jpg',
		backgroundImage: '',
		social: {
			facebook: '',
			linkedin: '',
			instagram: '',
			snapchat: '',
			google: '',
		},
		school: 'U.C. Berkeley',
		keywords: ['Photoshop', 'Figma', 'Python'],
		availability: {
			Mon: [{ start: '9am', end: '11am' }],
			Tue: null,
			Wed: [
				{ start: '9am', end: '11:30am' },
				{ start: '2pm', end: '4pm' },
			],
			Thu: null,
			Fri: null,
			Sat: [
				{ start: '9am', end: '11am' },
				{ start: '2pm', end: '4:30pm' },
			],
			Sun: null,
		},
	},
	{
		id: 2,
		name: {
			first: 'Test2',
			last: 'Testing',
		},
		bio: 'I am a test',
		classes: ['CS61A', 'MATH100A'],
		email: 'test@test.com',
		isTutor: false,
		location: {
			city: 'Berkeley',
			state: 'California',
			country: 'United States',
		},
		organizations: 'Cal Boxing',
		password: '',
		phoneNumber: '(555)555-5555',
		image: 'https://randomuser.me/api/portraits/women/75.jpg',
		backgroundImage: '',
		social: {
			facebook: '',
			linkedin: '',
			instagram: '',
			snapchat: '',
			google: '',
		},
		school: 'U.C. Berkeley',
		keywords: ['Figma', 'Python'],
	},
	{
		id: 3,
		name: {
			first: 'Test3',
			last: 'Testing',
		},
		bio: 'I am a test',
		classes: ['CS61A'],
		email: 'test@test.com',
		isTutor: false,
		location: {
			city: 'Berkeley',
			state: 'California',
			country: 'United States',
		},
		organizations: 'Cal Boxing',
		password: '',
		phoneNumber: '(555)555-5555',
		image: 'https://randomuser.me/api/portraits/men/75.jpg',
		backgroundImage: '',
		social: {
			facebook: '',
			linkedin: '',
			instagram: '',
			snapchat: '',
			google: '',
		},
		school: 'U.C. Berkeley',
		keywords: ['Photoshop', 'Figma', 'Python'],
	},
];

const userReducer = (state = INITIAL_STATE, action) => {
	return state;
};

export default userReducer;
