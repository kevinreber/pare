/**
 * Function returns a string with the first letter capitalized.
 *
 * @param {string}      str String that needs to have first letter capitalized.
 * @returns {string}    Returns string of str with first letter capitalized.
 */
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export default capitalizeFirstLetter;
