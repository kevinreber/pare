/** Components & Helpers */
import addUserToCollection from './addUserToCollection';
import db from '../config/fbConfig';

/**
 * Creates a new message in the DB and returns the newMessage.id
 *
 * @param {String} collection
 * @param {object} messageData
 * @param {String} subCollection
 * @param {object} chatData
 * @param {object} user
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

	// if 'study-group' collection, add user to 'users' subcollection
	if (collection === 'study-group') {
		db.collection(collection).doc(newMessage.id).set(messageData);

		const addUser = {
			uid: user.uid,
			admin: true,
			displayName: user.displayName,
			photoURL: user.photoURL,
		};
		addUserToCollection(collection, newMessage.id, user.uid, addUser);

		// Add chat message to 'chats' collection
		if (chatData) {
			db.collection(collection)
				.doc(newMessage.id)
				.collection(subCollection)
				.add(chatData);
		}
	}

	return newMessage.id;
}

export default createNewMessage;
