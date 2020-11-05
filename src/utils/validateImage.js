import { PropTypes } from 'prop-types';

/**
 * Function returns boolean value and prompts error message if file is not an image or file size exceeds 2MB.
 *
 * @param 	{object}     file 			Object of file data.
 * @param 	{function}   setErrors 		Function that returns error messages to error state.
 * @returns {boolean}    Returns boolean checking if file is a validated image and file size does not exceed 2MB.
 */
function fileIsImage(file, setErrors) {
	if (
		file.type.indexOf('image') === -1 ||
		!file.name.match(/.(jpg|jpeg|png|gif)$/i)
	) {
		setErrors('*File not supported');
		return false;
	}
	if (file.size / 1024 / 1024 > 2) {
		setErrors('*Attachments must be less than 2 MB ');
		return false;
	}
	return true;
}

fileIsImage.propTypes = {
	file: PropTypes.object,
	setErrors: PropTypes.func,
};

export default fileIsImage;
