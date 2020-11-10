/** Dependencies */
import firebase from 'firebase';
import { PropTypes } from 'prop-types';

/** Helpers */
import db from '../config/fbConfig';

/** Removes user to collection
 * @param	{string}	collection		Collection to be accessed.
 * @param	{string}	docId			Document Id to update.
 * @param	{object}	data			Data to be removed from document.
 * @param	{array}		users			Used as reference, if no users are left in collection, document will be deleted.
 */
async function removeUserFromCollection(collection, docId, data, users = []) {
	// Get Document information
	const ref = await db.collection(collection).doc(docId);

	// Remove user from users array
	if (data) {
		// study group DB is stored differently
		if (collection === 'study-groups') {
			console.log(data);
			// look for user in users collection by their userID
			await db
				.collection(collection)
				.doc(docId)
				.collection('users')
				.doc(data)
				.delete();

			// Remove user's ID from usersList
			await ref.update({
				usersList: firebase.firestore.FieldValue.arrayRemove(data),
			});
			console.log('success');
		} else {
			ref.update({ users: firebase.firestore.FieldValue.arrayRemove(data) });
			console.log('success');
		}
	}

	// if last user left, delete Study Group
	if (users.length === 1) {
		ref.delete();
		console.log('deleted empty document');
	}
}

removeUserFromCollection.propTypes = {
	collection: PropTypes.string.isRequired,
	docId: PropTypes.string.isRequired,
	data: PropTypes.object,
	users: PropTypes.array,
};

export default removeUserFromCollection;
