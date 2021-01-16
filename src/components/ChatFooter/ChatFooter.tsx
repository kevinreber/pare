import React, { memo, useMemo, useCallback } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import useFields from '../../hooks/useFields';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';

interface ChatFooterProps {
	send: any;
	type?: string;
}

interface IState {
	message: string;
	createdAt: any;
	username: string;
	userId: string;
	avatar: string;
}

/** Re-usable Chat Footer for any features that involves submitting a message/comment */
function ChatFooter({ send, type = 'message' }: ChatFooterProps): JSX.Element {
	const currentUser = useSelector((state: any) => state.auth.user);

	const INITIAL_STATE: IState = useMemo(
		() => ({
			message: '',
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			username: currentUser.displayName,
			userId: currentUser.uid,
			avatar: currentUser.photoURL,
		}),
		[currentUser]
	);

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			// Check if field is empty or white space
			if (formData.message && formData.message.trim() !== '') {
				send(formData);
				resetFormData();
			} else {
				console.log('error');
			}
		},
		[formData, send, resetFormData]
	);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					name="message"
					onChange={handleChange}
					value={formData.message}
					type="text"
					placeholder={`Type ${type} here...`}
				/>
				<div className="message__attachments">
					<IconButton>
						<ImageIcon fontSize="large" />
					</IconButton>
				</div>
				<IconButton type="submit" disabled={!formData.message}>
					<SendIcon />
				</IconButton>
			</form>
		</>
	);
}

export default memo(ChatFooter);
