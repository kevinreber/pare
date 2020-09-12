/** Dependencies */
import moment from 'moment';
import { original, produce } from 'immer';

/** Action Types */
import { UPDATE_AVAILABILITY } from '../actions/types';

const mTime = {
	start: moment(new Date()).format(),
	end: moment(new Date()).format(),
};

const newTime = {
	start: new Date().getTime(),
	end: new Date().getTime(),
};

const INITIAL_AVAIL = {
	monday: [mTime],
	tuesday: [newTime],
	wednesday: [newTime],
	thursday: [newTime],
	friday: [newTime],
	saturday: [newTime],
	sunday: [newTime],
};

const userAvailabilityReducer = (state = INITIAL_AVAIL, action) => {
	switch (action.type) {
		case UPDATE_AVAILABILITY:
			const { time, day, type, index } = action.availability;
			console.log(time, day, type, index);
			return produce(state, (draft) => {
				// const copy = original(draft);
				// console.log(copy[day][index][type]);
				draft[day][index][type] = time;
				// draft[day].push({ type: time });
			});
		case 'ADD_AVAILABILITY':
			const { dayAvailable } = action.availability;
			return produce(state, (draft) => {
				draft[dayAvailable].push(newTime);
			});
		default:
			return state;
	}
};

export default userAvailabilityReducer;
