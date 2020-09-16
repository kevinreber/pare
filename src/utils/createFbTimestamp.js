/** Dependencies */
import firebase from 'firebase';

function createFbTimestamp() {
	return firebase.firestore.FieldValue.serverTimestamp();
}

export default createFbTimestamp;
