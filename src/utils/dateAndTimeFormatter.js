/** Dependencies */
import moment from 'moment';

/** Adds user to collection */
function dateAndTimeFormatter(date) {
    return moment(date).format('YYYY-MM-DDThh:mm')
}

export default dateAndTimeFormatter;