import { FETCH_CATALOG, FETCH_CATALOG_ERROR } from './types';
import axios from 'axios';

const BASE_URL = 'https://www.berkeleytime.com';

/** fetch all courses in catalog from berkeleytime API */
export function fetchCourseCatalog() {
	// thunk
	return async function (dispatch) {
		try {
			// const response = await axios.get(`${BASE_URL}/api/catalog/catalog_json/`);
			// return dispatch(getCourseCatalog(response.data));
			return dispatch(getCourseCatalog([]));
		} catch (err) {
			dispatch(dispatchError(FETCH_CATALOG_ERROR, err));
		}
	};
}

/** Formats action data to input to dispatch */
function getCourseCatalog(catalog) {
	return {
		type: FETCH_CATALOG,
		catalog,
	};
}

/** Dispatch error handler */
function dispatchError(type, error) {
	return {
		type,
		error,
	};
}
