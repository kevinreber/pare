import { PropTypes } from 'prop-types';

/**
 * Function returns boolean value and prompts error message if file is not an image.
 *
 * @param 	{object}     file 			Object of file data.
 * @param 	{function}   setErrors 		Function that returns error messages to error state.
 * @returns {boolean}    Returns boolean checking if file is a validated image.
 */
function fileIsImage(file, setErrors) {
	if (
		file.type.indexOf('image') === -1 ||
		!file.name.match(/.(jpg|jpeg|png|gif)$/i)
	) {
		setErrors('*File not supported');
		return false;
	}
	return true;
}

fileIsImage.propTypes = {
	file: PropTypes.object,
	setErrors: PropTypes.func,
};

export default fileIsImage;
