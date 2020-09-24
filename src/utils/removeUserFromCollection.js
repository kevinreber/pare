/** Dependencies */
import firebase from 'firebase';

/** Helpers */
import db from '../config/fbConfig';

/** Removes user to collection */
async function removeUserFromCollection(collection, docId, data, users = []) {
	// Get Document information
	const ref = await db.collection(collection).doc(docId);

	// Remove user from users array
	if (data) {
		ref.update({ users: firebase.firestore.FieldValue.arrayRemove(data) });
		console.log('success');
	}

	// if last user left, delete Study Group
	if (users.length === 1) {
		ref.delete();
		console.log('deleted empty document');
	}
}

export default removeUserFromCollection;