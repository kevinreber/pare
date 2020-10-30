/** Dependencies */
import firebase from 'firebase';

/** Returns firebase timestamp
 * @returns	{object}	Object of firebase timestamp that has seconds and nanoseconds keys.
 *
 * ex:
 * 	timestamp = { seconds: ..., nanoseconds: ... };
 *
 * Has built in methods for easier reading timestamps.
 *   ex: timestamp.toDate(), timestamp.compareTo(timestamp2), timestamp.getSeconds()
 *
 * To learn more about firebase timestamp methods, look into Firebase Timestamp.
 */
function createFbTimestamp() {
	return firebase.firestore.FieldValue.serverTimestamp();
}

export default createFbTimestamp;
