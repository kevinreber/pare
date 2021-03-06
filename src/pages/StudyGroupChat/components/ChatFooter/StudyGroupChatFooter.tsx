/** Dependencies */
import React, { memo, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';

/** Components & Helpers */
import useFields from '../../../../hooks/useFields';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import { addFlashMessage } from '../../../../store/actions/flashMessages';
import { ChatFooterTypes, FormDataTypes } from '../../interface';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
// import ImageIcon from '@material-ui/icons/Image';
//  ! Test adding images
// import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
// import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

/** Displays Study Group's Chat Footer that allows the user to enter a message
 * StudyGroups -> StudyGroupsList -> StudyGroupCard -> StudyGroupChat -> StudyGroupChatFooter
 *
 * @param {function}	send	Function to send new message to DB of Study Group.
 * @param {object}	 	user	Object of current user's data.
 *
 */
const StudyGroupChatFooter = ({ send, user }: ChatFooterTypes) => {
	const dispatch = useDispatch();

	const INITIAL_STATE: FormDataTypes = {
		message: '',
		// @ts-ignore
		createdAt: createFbTimestamp(),
		displayName: user.displayName,
		uid: user.uid,
	};

	const [formData, handleChange, resetFormData] = useFields(INITIAL_STATE);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// Check if field is empty or white space
		if (formData.message && formData.message.trim() !== '') {
			send(formData);
			resetFormData();
		} else {
			dispatch(
				addFlashMessage({
					isOpen: true,
					message: 'MESSAGES CAN NOT BE EMPTY',
					type: 'error',
				})
			);
			resetFormData();
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					name="message"
					onChange={handleChange}
					value={formData.message}
					type="text"
					placeholder="Type message here..."
				/>
				{/* <div className="message__attachments"> */}
				{/* <IconButton>
						<ImageIcon fontSize="large" />
					</IconButton>
				</div> */}
				{/* @ts-ignore */}
				<IconButton
					type="submit"
					disabled={!formData.message}
					variant="contained">
					<SendIcon />
				</IconButton>
			</form>
		</>
	);
};

StudyGroupChatFooter.propTypes = {
	send: PropTypes.func,
	user: PropTypes.object,
};

export default memo(StudyGroupChatFooter);
