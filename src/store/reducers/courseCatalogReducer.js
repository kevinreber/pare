import { FETCH_CATALOG, FETCH_CATALOG_ERROR } from '../actions/types';

const courseCatalogReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_CATALOG:
			console.log('getting catalog...', action.catalog);
			return { ...state, ...action.catalog };
		case FETCH_CATALOG_ERROR:
			console.log(action.type, action.error);
			return { ...state, ...action.error };
		default:
			return state;
	}
};

export default courseCatalogReducer;
