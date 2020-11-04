/** Dependencies */
import React, { useState } from 'react';
import firebase from 'firebase';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';

/** Components */
import SubmitButton from '../general/SubmitButton';
import ConfirmDialog from '../general/ConfirmDialog';
import dateAndTimeFormatter from '../../utils/dateAndTimeFormatter';

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
	attachment_preview = null,
	attachment = null,
	timestamp,
	comments,
}) {
	/** Post Type options */
	const postTypeOptions = [
		'Networking',
		'Campus',
		'Opportunities',
		'Marketplace',
		'Events',
	];

	const INITIAL_STATE = {
		userId: userId,
		username: username,
		avatar: avatar,
		title: title,
		description: description,
		type: type,
		start: start,
		end: end,
		attachment_preview: attachment_preview,
		attachment: attachment,
		timestamp: timestamp,
		num_of_comments: comments,
	};

	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);

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
			if (validateAttachment(file)) {
				setFormData((fData) => ({
					...fData,
					attachment_preview: URL.createObjectURL(file),
					attachment: file,
				}));
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

	/** Validates attachment and prompts error */
	const validateAttachment = (file) => {
		if (
			file.type.indexOf('image') === -1 ||
			!file.name.match(/.(jpg|jpeg|png|gif)$/i)
		) {
			setErrors('*File not supported');
			return false;
		}
		return true;
	};

	/** Resets attachment data */
	const resetAttachment = () => {
		setFormData((fData) => ({
			...fData,
			attachment_preview: '',
			attachment: '',
		}));
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
				onConfirm: () => {
					formData.location = {
						address,
						coordinates,
					};
					save(formData);
				},
			});
		}
	};

	return (
		<div className="PostForm p-3">
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
							{formData.attachment_preview ? (
								<>
									<img
										src={formData.attachment_preview}
										alt="preview"
										className="attachment__preview"
									/>
									<IconButton onClick={resetAttachment}>
										<CancelIcon className="remove__attachment" />
									</IconButton>
								</>
							) : (
								''
							)}
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
