import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/** Will only allow access to certain routes based on User's credentials */
function PrivateRoute({ path, component }) {
	/** User must be logged in, in order to access Private Routes */
	const currentUser = useSelector((state) => state.auth.user);

	/** if user isn't logged in, redirect to login page */
	if (!currentUser) {
		return <Redirect to='/login' />;
	}

	return <Route exact path={path} component={component} />;
}

export default PrivateRoute;
