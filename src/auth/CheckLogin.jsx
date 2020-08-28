import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** If user is logged in, they should not have access too '/login' and '/signup' page */
function CheckLogin({ path, component }) {
	/** User must be logged in, in order to access Private Routes */
	const currentUser = useSelector((state) => state.auth.auth);

	if (currentUser && (path === '/login' || path === '/signup')) {
		return <Redirect to='/feed' />;
	}

	return <Route exact path={path} component={component} />;
}

export default CheckLogin;
