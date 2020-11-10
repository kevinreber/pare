/** Dependencies */
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import addUserToCollection from './addUserToCollection';
import db from '../config/fbConfig';

/** Creates a new message in the DB and returns the newMessage.id
 *
 * @param 	{String} 	collection			Collection to be accessed.
 * @param 	{object} 	messageData			Message Data being 'sent'.
 * @param 	{String} 	subCollection		Sub-collection to be accessed.
 * @param 	{object} 	chatData			Chat Data to be added to 'chats' sub-collection.
 * @param 	{object} 	user				Object of user data.
 */
async function createNewMessage(
	collection,
	messageData,
	subCollection = null,
	chatData = null,
	user = null
) {
	// Make new document
	const newMessage = await db.collection(collection).add(messageData);

	// if 'study-group' collection, add user to 'users' sub-collection
	if (collection === 'study-groups') {
		db.collection(collection).doc(newMessage.id).set(messageData);

		const addUser = {
			uid: user.uid,
			admin: true,
			displayName: user.displayName,
			photoURL: user.photoURL,
		};
		addUserToCollection(collection, newMessage.id, user.uid, addUser);
	}
	// Add chat message to 'chats' collection
	if (chatData) {
		db.collection(collection)
			.doc(newMessage.id)
			.collection(subCollection)
			.add(chatData);
	}

	return newMessage.id;
}

createNewMessage.propTypes = {
	collection: PropTypes.string.isRequired,
	messageData: PropTypes.object.isRequired,
	subCollection: PropTypes.string,
	chatData: PropTypes.object,
	user: PropTypes.object,
};

export default createNewMessage;
