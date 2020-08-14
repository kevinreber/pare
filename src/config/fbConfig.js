import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyD2UMWIhhArLUn3reOIgnfrFWwwBNlUPEs',
	authDomain: 'mate-app-b5fe6.firebaseapp.com',
	databaseURL: 'https://mate-app-b5fe6.firebaseio.com',
	projectId: 'mate-app-b5fe6',
	storageBucket: 'mate-app-b5fe6.appspot.com',
	messagingSenderId: '237545926078',
	appId: '1:237545926078:web:236dd61f87e567c5f41def',
	measurementId: 'G-D1JJWVC0JR',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
