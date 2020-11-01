/** Dependencies */
import moment from 'moment';
import { PropTypes } from 'prop-types';

/** Converts Firebase Timestamp using moment.
 * @param   {object}    date    Firebase Timestamp object to be converted to moment string.
 * @returns {string}            ex.'15 minutes ago'
 */
function dateFromNowFormatter(date) {
	return moment(date.toDate()).fromNow();
}

dateFromNowFormatter.propTypes = {
	date: PropTypes.object,
};

export default dateFromNowFormatter;
