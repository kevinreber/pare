/** Components & Helpers */
import db from '../config/fbConfig';

/**
 * Creates a new message in the DB and returns the newMessage.id
 *
 * @param {object} messageData
 * @param {object} chatData
 */
async function createNewMessage(
	collection,
	messageData,
	subCollection = null,
	chatData = null
) {
	// Make new document
	const newMessage = await db.collection(collection).add(messageData);

	// Add chat message to 'chats' collection
	if (chatData) {
		db.collection(collection)
			.doc(newMessage.id)
			.collection(subCollection)
			.add(chatData);
	}

	return newMessage.id;
}

export default createNewMessage;
