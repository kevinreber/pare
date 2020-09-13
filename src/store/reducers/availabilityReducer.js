/** Dependencies */
import moment from 'moment';
import { produce } from 'immer';

/** Action Types */
import {
	UPDATE_AVAILABILITY,
	ADD_AVAILABILITY,
	REMOVE_AVAILABILITY,
} from '../actions/types';

const mTime = {
	start: moment(new Date()).format(),
	end: moment(new Date()).format(),
};

const newTime = {
	start: new Date().getTime(),
	end: new Date().getTime(),
};

/** Each week has an array of objects for their available 'start' and 'end' time(s) of the day */
const INITIAL_AVAIL = {
	monday: [mTime],
	tuesday: [mTime],
	wednesday: [mTime],
	thursday: [mTime],
	friday: [mTime],
	saturday: [mTime],
	sunday: [mTime],
};

const userAvailabilityReducer = (state = INITIAL_AVAIL, action) => {
	switch (action.type) {
		case UPDATE_AVAILABILITY:
			const { time, day, type, index } = action.availability;
			console.log(time, day, type, index);
			return produce(state, (draft) => {
				draft[day][index][type] = time;
			});
		case ADD_AVAILABILITY:
			const { dayAvailable } = action.availability;
			return produce(state, (draft) => {
				draft[dayAvailable].push(newTime);
			});
		case REMOVE_AVAILABILITY:
			const { dayToRemoveFrom, indexToRemove } = action.availability;
			return produce(state, (draft) => {
				draft[dayToRemoveFrom].splice(indexToRemove, 1);
			});
		default:
			return state;
	}
};

export default userAvailabilityReducer;
