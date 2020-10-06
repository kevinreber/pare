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
		if (collection === 'study-group') {
			console.log(collection, docId, field, data);
			// ref.update({ [field]: data });
			db.collection(collection)
				.doc(docId)
				.collection('users')
				.doc(field)
				.set(data);

			// Append users ID to usersList
			await ref.update({
				usersList: firebase.firestore.FieldValue.arrayUnion(data.uid),
			});
			console.log('success');
		} else {
			ref.update({ [field]: firebase.firestore.FieldValue.arrayUnion(data) });
			console.log('success');
		}
	}
}

export default addUserToCollection;
