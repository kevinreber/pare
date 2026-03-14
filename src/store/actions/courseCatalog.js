import { FETCH_CATALOG, FETCH_CATALOG_ERROR } from './types';

/** fetch all courses in catalog from berkeleytime API */
export function fetchCourseCatalog() {
	return async function (dispatch) {
		try {
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
