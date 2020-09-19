/** Components & Helpers */
import db from '../config/fbConfig';

/**
 * Creates a new message in the DB and returns the newMessage.id
 *
 * @param {object} messageData
 * @param {object} chatData
 */
async function createNewMessage(messageData, chatData = null) {
	// Make new document
	const newMessage = await db.collection('messages').add(messageData);

	// Add chat message to 'chats' collection
	if (chatData) {
		db.collection('messages')
			.doc(newMessage.id)
			.collection('chats')
			.add(chatData);
	}

	return newMessage.id;
}

export default createNewMessage;
