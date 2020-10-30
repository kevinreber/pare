/** Dependencies */
import firebase from 'firebase';
import { PropTypes } from 'prop-types';

/** Helpers */
import db from '../config/fbConfig';

/** Adds user to 'users' sub-collection or field array.
 * @param	{string}	collection		Collection to be accessed.
 * @param	{string}	docId			Document Id to update.
 * @param	{string}	field			Document Id of 'users' sub-collection OR field to update.
 * @param	{object}	data			Data to be added to document.
 */
async function addUserToCollection(collection, docId, field, data) {
	// Get Document information
	const ref = await db.collection(collection).doc(docId);

	// Add data to collection group's array of users
	if (data) {
		if (collection === 'study-group') {
			console.log(docId, field, data);
			db.collection(collection)
				.doc(docId)
				.collection('users')
				.doc(field)
				.set(data);

			// Append user's ID to usersList
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

addUserToCollection.prototypes = {
	collection: PropTypes.string.isRequired,
	docId: PropTypes.string.isRequired,
	field: PropTypes.string,
	data: PropTypes.object,
};

export default addUserToCollection;
