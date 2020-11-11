/** Dependencies */
import React from 'react';

/** Components & Helpers */
import useFields from '../../../../hooks/useFields';
import createFbTimestamp from '../../../../utils/createFbTimestamp';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';

/** Displays Messages Chat Footer that allows the user to enter a message
 * Notifications -> MessagesList -> MessageCard -> Message -> MessageFooter
 */
function MessageFooter({ send, uid }) {
	const INITIAL_STATE = {
		content: '',
		createdAt: createFbTimestamp(),
		uid: uid,
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Check if field is empty or white space
		if (formData.content && formData.content.trim() !== '') {
			send(formData);
			resetFormData();
		} else {
			console.log('error');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					name="content"
					onChange={handleChange}
					value={formData.content}
					type="text"
					placeholder="Type message here..."
				/>
				<div className="message__attachments">
					<IconButton>
						<ImageIcon fontSize="large" />
					</IconButton>
				</div>
				<IconButton
					type="submit"
					disabled={!formData.content}
					variant="contained">
					<SendIcon />
				</IconButton>
			</form>
		</>
	);
}

export default MessageFooter;
