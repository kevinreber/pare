/** Dependencies */
import firebase from 'firebase';

/** Helpers */
import db from '../config/fbConfig';

/** Adds user to collection */
async function addUserToCollection(collection, docId, field, data) {
	// Get Document information
	const ref = await db.collection(collection).doc(docId);

	// Add data to collection group's array of users
	if (data) {
		ref.update({ [field]: firebase.firestore.FieldValue.arrayUnion(data) });
		console.log('success');
	}
}

export default addUserToCollection;
