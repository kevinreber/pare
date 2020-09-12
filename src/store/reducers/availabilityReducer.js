/** Dependencies */
import moment from 'moment';
import { original, produce } from 'immer';

/** Components & Helpers */
import { UPDATE_AVAILABILITY } from '../actions/types';

const INITIAL_AVAIL = {
	monday: [
		{ start: moment(new Date()).format(), end: moment(new Date()).format() },
	],
	tuesday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	wednesday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	thursday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	friday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	saturday: [{ start: new Date().getTime(), end: new Date().getTime() }],
	sunday: [{ start: new Date().getTime(), end: new Date().getTime() }],
};

const userAvailabilityReducer = (state = INITIAL_AVAIL, action) => {
	switch (action.type) {
		case UPDATE_AVAILABILITY:
			console.log(action);
			return produce(state, (draft) => {
				console.log(draft);
			});
		default:
			return state;
	}
};

export default userAvailabilityReducer;
