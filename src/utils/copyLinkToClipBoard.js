/** Dependencies */
import { PropTypes } from 'prop-types';

import { HOST_URL } from '../constants/index';
/** ! TEMP URL */
// const HOST_URL = 'localhost:3000';

/** Copies link browser clipboard.
 * @param   {string}     link    String to be copied to browser clipboard.
 * @returns {string}
 */
const copyLinkToClipBoard = async (link) => {
	return await navigator.clipboard.writeText(HOST_URL + link);
};

copyLinkToClipBoard.propTypes = {
	link: PropTypes.string.isRequired,
};

export default copyLinkToClipBoard;
