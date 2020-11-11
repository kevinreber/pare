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
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import createFbTimestamp from '../../../../utils/createFbTimestamp';
import fileIsImage from '../../../../utils/validateImage';
import { storage } from '../../../../config/fbConfig';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import CancelIcon from '@material-ui/icons/Cancel';

/** Form for user's to create a Post
 *  Feed -> PostForm
 */
function PostForm({ save }) {
	/** Get user data */
	const user = useSelector((state) => {
		return {
			userId: state.auth.user.uid,
			username: state.auth.user.displayName,
			avatar: state.auth.user.photoURL,
		};
	});

	const INITIAL_STATE = {
		userId: user.userId,
		username: user.username,
		avatar: user.avatar,
		title: '',
		description: '',
		type: '',
		start: null,
		end: null,
		attachment: '',
		attachment_name: '',
		timestamp: createFbTimestamp(),
		last_updated: createFbTimestamp(),
		num_of_comments: 0,
	};

	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);

	const [image, setImage] = useState(INITIAL_STATE_IMAGE);
	const [progressBar, setProgressBar] = useState(0);

	// location data
	const [address, setAddress] = useState('');
	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null,
	});

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setAddress(value);
		setCoordinates(latLng);
	};

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

	/** Reset all formData */
	const resetFormData = () => {
		setFormData(INITIAL_STATE);
		resetAttachment();
	};

	/** Resets attachment data.
	 * 	If user is clearing state manually, image URL will be deleted from DB.
	 */
	const resetAttachment = (removeUrl = false) => {
		if (removeUrl) {
			const storageRef = storage.ref();
			const storageImage = storageRef.child(
				`feed/${user.userId}/${image.name}`
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
			formData.location = {
				address,
				coordinates,
			};

			save(formData);
			// Clear state of form
			setFormData(INITIAL_STATE);
			resetAttachment();
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
			<h4>New Event</h4>
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
					<label htmlFor="type" className="float-left mr-4">
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
					<label htmlFor="event-start mb-3" className="float-left">
						Start
					</label>
					<TextField
						id="event-start"
						type="datetime-local"
						className="float-right"
						defaultValue={formData.start}
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
						defaultValue={formData.end}
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
							{image.attachment_preview ? (
								<>
									<img
										src={image.attachment_preview}
										alt="preview"
										className="attachment__preview"
									/>
									<IconButton onClick={() => resetAttachment(true)}>
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
				<SubmitButton text="Post" reset={true} resetForm={resetFormData} />
			</form>
			{errors ? (
				<div className="Form__Errors">
					<div className="alert errors">{errors}</div>
				</div>
			) : (
				''
			)}
			<div className="Post-Form-Padding"></div>
		</div>
	);
}

export default PostForm;
