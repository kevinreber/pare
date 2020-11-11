/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
import { postTypeOptions, INITIAL_STATE_IMAGE } from '../../constants/index';

/** Components && Helpers */
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import ConfirmDialog from '../../../../components/ConfirmDialog/ConfirmDialog';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import dateAndTimeFormatter from '../../../../utils/dateAndTimeFormatter';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import fileIsImage from '../../../../utils/validateImage';
import { storage } from '../../../../config/fbConfig';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import CancelIcon from '@material-ui/icons/Cancel';

/** Form for user's to create a Post
 *  Feed -> FeedList -> PostCard -> EditPostForm
 */
function EditPostForm({
	save,
	userId,
	username,
	avatar,
	title,
	description,
	location = null,
	type = null,
	start = null,
	end = null,
	attachment = '',
	attachment_name = '',
	timestamp,
	comments,
}) {
	/** Get user data */
	const user = useSelector((state) => {
		return {
			userId: state.auth.user.uid,
			username: state.auth.user.displayName,
			avatar: state.auth.user.photoURL,
		};
	});

	const INITIAL_STATE = {
		userId: userId,
		username: username,
		avatar: avatar,
		title: title,
		description: description,
		type: type,
		start: start,
		end: end,
		attachment: attachment,
		attachment_name: attachment_name,
		timestamp: timestamp,
		last_updated: createFbTimestamp(),
		num_of_comments: comments,
	};

	const EXISTING_STATE_IMAGE = {
		attachment_preview: attachment,
		attachment: attachment,
		name: attachment_name,
		url: attachment,
	};

	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);

	const [image, setImage] = useState(EXISTING_STATE_IMAGE);
	const [progressBar, setProgressBar] = useState(0);

	// location data
	const [address, setAddress] = useState(
		location.address ? location.address : ''
	);
	const [coordinates, setCoordinates] = useState({
		lat: location ? location.coordinates.lat : null,
		lng: location ? location.coordinates.lng : null,
	});

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setAddress(value);
		setCoordinates(latLng);
	};

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	/** Update state in formData */
	const handleChange = (e) => {
		// Reset errors each change
		setErrors('');
		// if uploading media file, update formData
		if (e.target.files) {
			resetAttachment();
			const file = e.target.files[0];

			/** Validates attachment and prompts error */
			if (fileIsImage(file, setErrors)) {
				setImage((data) => ({
					...data,
					attachment_preview: URL.createObjectURL(file),
					attachment: file,
					name: file.name,
				}));
				handleUpload(file);
			}
		} else {
			let { name, value } = e.target;

			/** Handles 'start' and 'end' date fields */
			if (name === 'end' || name === 'start') {
				const date = new Date(value);
				value = firebase.firestore.Timestamp.fromDate(date);
			}
			setFormData((fData) => ({
				...fData,
				[name]: value,
			}));
		}
	};

	/** Resets attachment data.
	 * 	If user is clearing state manually, image URL will be deleted from DB.
	 */
	const resetAttachment = async (
		removeUrl = false,
		replaceOriginalAttachment = false
	) => {
		if (removeUrl) {
			// if attachment is being replaced, we need to remove the previous existing attachment from the DB
			// else we can remove the current temporary attachment from the DB
			let imageToRemove = replaceOriginalAttachment
				? EXISTING_STATE_IMAGE
				: image;

			const storageRef = storage.ref();
			const storageImage = storageRef.child(
				`feed/${user.userId}/${imageToRemove.name}`
			);

			storageImage
				.delete()
				.then(() => {
					console.log('Removed image');
				})
				.catch((err) => {
					console.log(err);
				});
		}
		setImage(INITIAL_STATE_IMAGE);
		setProgressBar(0);
	};

	/** Validate submitted data */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.title) {
			setErrors('*Title required');
			return false;
		}
		if (!formData.description) {
			setErrors('*Description required');
			return false;
		}
		return true;
	};

	/** Handle's submitted form data */
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			/** Prompts Modal to edit Post information */
			setConfirmDialog({
				isOpen: true,
				title: 'Save changes?',
				subtitle: '',
				onConfirm: async () => {
					formData.location = {
						address,
						coordinates,
					};
					if (image.url === '') {
						formData.attachment = image.url;
						formData.attachment_name = image.name;
					}
					// if attachment is being updated, remove existing attachment url
					if (image.url !== EXISTING_STATE_IMAGE.url) {
						await resetAttachment(true, true);
					} else await resetAttachment(true, false);
					console.log(formData);
					save(formData);
				},
			});
		}
	};

	// Handles image upload to DB
	const handleUpload = async (image) => {
		const storageRef = storage.ref(`feed/${user.userId}/${image.name}`);

		storageRef.put(image).on(
			'state_changed',
			(snapshot) => {
				let progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgressBar(progress);
			},
			(error) => {
				setErrors(error);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				setImage((data) => ({
					...data,
					url,
					name: image.name,
				}));
				setFormData((fData) => ({
					...fData,
					attachment: url,
					attachment_name: image.name,
				}));
			}
		);
	};

	return (
		<div className="PostForm">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<h4>Edit Post</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title" className="float-left">
						Title*
					</label>
					<input
						id="title"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="title"
						value={formData.title}
						maxLength="30"
						required
					/>
					<small
						className={`char-count ${
							30 - formData.title.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.title.length} characters remaining
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="float-left">
						Description*
					</label>
					<textarea
						rows="3"
						id="description"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="description"
						value={formData.description}
						maxLength="100"
						required
					/>
					<small
						className={`char-count ${
							100 - formData.description.length <= 10 ? 'error-limit' : ''
						}`}>
						{100 - formData.description.length} characters remaining
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="location" className="float-left">
						Location
					</label>
					<PlacesAutocomplete
						value={address}
						onChange={setAddress}
						onSelect={handleSelect}>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div className="Autocomplete-Location">
								<input
									{...getInputProps({
										placeholder: 'Type address',
										id: 'location',
										className: 'form-control mate-form-input',
									})}
								/>
								<div className="Autocomplete-Location-List">
									{loading ? <div>loading...</div> : null}

									{suggestions.map((suggestion, idx) => {
										const style = {
											backgroundColor: suggestion.active
												? '#393e46'
												: 'rgb(43, 47, 58)',
										};

										return (
											<div
												key={idx}
												className="Autocomplete-Location-Item"
												{...getSuggestionItemProps(suggestion, { style })}>
												{suggestion.description}
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
				</div>
				<div className="form-group d-flex justify-content-between align-items-baseline">
					<label htmlFor="postType" className="float-left mr-4">
						Type
					</label>
					<select
						id="postType"
						className="form-control mate-form-input"
						onChange={handleChange}
						name="type"
						value={formData.type}>
						<option className="option-disabled" value="" disabled>
							Select Type
						</option>
						{postTypeOptions.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</div>
				<div className="form-group date-input-group align-items-baseline">
					<label htmlFor="event-start" className="float-left">
						Start
					</label>
					<TextField
						id="event-start"
						type="datetime-local"
						className="float-right"
						defaultValue={
							formData.start
								? dateAndTimeFormatter(formData.start.toDate())
								: null
						}
						name="start"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className="form-group align-items-baseline">
					<label htmlFor="event-end" className="float-left">
						End
					</label>
					<TextField
						id="event-end"
						type="datetime-local"
						className="float-right"
						defaultValue={
							formData.end ? dateAndTimeFormatter(formData.end.toDate()) : null
						}
						name="end"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className="PostForm__Footer">
					<div className="message__attachments">
						<div className="preview__attachment">
							{image.url && image.url !== '' ? (
								<>
									<img
										src={image.url}
										alt="preview"
										className="attachment__preview"
									/>
									<IconButton onClick={() => resetAttachment(false, false)}>
										<CancelIcon className="remove__attachment" />
									</IconButton>
								</>
							) : (
								''
							)}
							<ProgressBar progress={progressBar} />
						</div>
						<label htmlFor="attachment" className="attachment__label">
							<PanoramaOutlinedIcon fontSize="large" />
						</label>
						<input
							type="file"
							id="attachment"
							style={{ display: 'none' }}
							onChange={handleChange}
						/>
					</div>
				</div>
				<SubmitButton text="Save Changes" />
			</form>
			{errors ? (
				<div className="Form__Errors">
					<div className="alert errors">{errors}</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default EditPostForm;
