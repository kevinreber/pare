/** Dependencies */
import firebase from 'firebase';

/** Helpers */
import db from '../config/fbConfig';

/** Removes user to collection */
async function removeUserFromCollection(collection, docId, data) {
	// Get Document information
	const ref = await db.collection(collection).doc(docId);

	// Remove user from users array
	if (data) {
		ref.update({ users: firebase.firestore.FieldValue.arrayRemove(data) });
		console.log('success');
	}
}

export default removeUserFromCollection;
